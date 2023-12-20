<template>
	<view class="integral-top" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'兑换详情'" :middle="true"></CustomHeader>
	</view>
	<view class="packet-detail-block">
		<view class="packet-detail flex-c">
			<view class="packet-top flex">
				<view class="image">
					<image src="https://yanxuan.nosdn.127.net/4333b709fac8932bbf86a48ebb022e34.png?type=webp&imageView&thumbnail=160x160&quality=75" class="packet-image"></image>
				</view>
				<view class="packet-num-condition flex-c">
					<text class="num">{{ticketInfo.ticket_name}}</text>
					<view class="condition">
						{{ticketInfo.suit_goods}}
					</view>
				</view>
			</view>
			<view class="packet-btm">
				-有效期以红包页面信息为准-
			</view>
		</view>
	</view>
	<!-- 兑换按钮 -->
	<view class="exchange-btn" @tap="onExchangeItem">
		{{ticketInfo.is_exchange}}积分兑换
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import { ref } from 'vue'
import {getTicketInfoAPI,updateExchangeTicketAPI} from '../../api/ticket.js'
import {updateIntegralAPI} from '../../api/integral.js'

const {safeAreaInsets} = uni.getSystemInfoSync()

const integral = ref('')
const ticketInfo = ref({})

const onExchangeItem = async () => {
	if(integral.value < ticketInfo.value.is_exchange) {
		uni.showToast({
			icon: 'error',
			title: '积分不足'
		})
		return
	} else {
		try{
			const now = new Date().getTime()
			integral.value = integral.value - ticketInfo.value.is_exchange
			let ticket = {id: ticketInfo.value.ticket_id, status: 0, get_time: now}
			let obj = {type: 0, count: ticketInfo.value.is_exchange, sum: integral.value, date: now}
			await Promise.all([updateExchangeTicketAPI(ticket),updateIntegralAPI(obj)])
			uni.showToast({
				icon: 'success',
				title: '兑换成功'
			})
		}catch(e){
			uni.showToast({
				icon: 'fail',
				title: '兑换失败，请稍后再试'
			})
		}
	}
}

const getTicketInfo = async (id) => {
	const res = await getTicketInfoAPI(id)
	ticketInfo.value = res.result
}
onLoad(options => {
	integral.value = options.integral
	getTicketInfo(options.id)
})
</script>

<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #e8e8e8;
}
.integral-top {
	height: 300rpx;
	background: linear-gradient(to bottom,#feefa9,#fee28c);
}
.packet-detail-block {
		position: absolute;
		left: 4vw;
		top: 15vh;
		width: 92vw;
		height: 22vh;
		padding: 16rpx;
		border-radius: 20rpx;
		background-color: #fbfefe;
		box-sizing: border-box;
		.packet-detail {
			width: 100%;
			height: 100%;
			padding: 40rpx 30rpx 16rpx 50rpx;
			background: linear-gradient(to right,#e6f3fc,#d6eaf8);
			box-sizing: border-box;
			justify-content: space-between;
			.packet-top {
				.image {
					margin: 6rpx 0;
					border-radius: 50%;
					background-color: #fff;
					.packet-image {
						width: 136rpx;
						height: 136rpx;
						border-radius: 50%;
				}
			}
			.packet-num-condition {
				justify-content: space-around;
				margin-left: 30rpx;
				.num {
					font-weight: 550;
				}
				.condition {
					font-size: 10.5px;
				}
			}
		}
		.packet-btm {
			color: #6b7a88;
			font-size: 12px;
			text-align: center;
		}
	}
}
.exchange-btn {
	margin: 25vh auto;
	padding: 2vh 18vw;
	border: 1px solid #c2b385;
	border-radius: 60rpx;
	color: #8c5819;
	background: linear-gradient(to right,#fde691,#fec781);
}
</style>

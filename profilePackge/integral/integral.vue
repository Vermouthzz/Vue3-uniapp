<template>
	<!-- 积分乐园 -->
	<view class="integral-top" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'积分中心'" :middle="true"></CustomHeader>
			<view class="user-info flex-a">
				<view class="info-left flex-a">
					<image :src="userStore.userInfo.avator" class="avator-image"></image>
					<view class="left-name flex-c">
						<text>{{userStore.userInfo.nickname}}</text>
						<view class="integral" @tap="toDetail(1)">
							积分:{{integralInfo.integral}}<van-icon name="arrow" />
						</view>
					</view>
				</view>
			<view class="detail-right" @tap="toDetail(1)">
				积分明细
			</view>
		</view>
	</view>
			<view class="integral-mid flex-c fff">
				<view class="mid-title">
					随机签到领积分
				</view>
				<view class="mid-item-block flex">
					<view class="mid-item flex-c-a" v-for="item in giftHook.randomList.value" :key="item" @tap="onTapGift(item)">
						<image src="https://yanxuan.nosdn.127.net/static-union/165657439481e369.png" class="mid-item-image"></image>
						<view class="item-text">
							赚积分
						</view>
						<view class="item-text-tap">
							点击签到赚积分
						</view>
					</view>
				</view>
			</view>
			<view class="item-block flex-c fff">
				<view class="item-header flex-a">
					<view class="title">
						积分兑好礼
					</view>
					<view class="change-detail" @tap="toDetail(2)">
						兑换明细
					</view>
				</view>
				<view class="item-main flex">
					<view class="item flex-c-a" v-for="(item,index) in ticketList" :key="index" @tap="toTicketDetail(item.ticket_id,integralInfo.integral)">
						<image src="https://yanxuan.nosdn.127.net/4333b709fac8932bbf86a48ebb022e34.png?type=webp&imageView&thumbnail=160x160&quality=75" class="item-image"></image>
						<text class="pack-name">{{item.ticket_name}}</text>
						<text class="integral-num">{{item.is_exchange}}积分兑</text>
					</view>
				</view>
			</view>
			<!-- 在页面内添加对应的节点 -->
			<van-notify id="van-notify" />
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {useUserStore} from '../../store/useUserStore.js'
import {useGiftHook} from './useHook.js'
import Notify from '../../wxcomponents/vant/notify/notify'
import { ref } from 'vue';
import {getUserIntegralAPI,updateIntegralAPI} from '../../api/integral.js'
import {getExchangeTicketAPI} from '../../api/ticket.js'
const userStore = useUserStore()
const giftHook = useGiftHook()
const {safeAreaInsets} = uni.getSystemInfoSync()

const toDetail = (type) => {
	uni.navigateTo({
		url: `/integralPackge/integral-detail/integral-detail?type=${type}`
	})
}
let flag = true
const onTapGift = async (val) => {
	if(!flag) return  //节流阀
	flag = false
	const nowTime = new Date()
	if(integralInfo.value.sign_date) {
		const signTime = new Date(Number(integralInfo.value.sign_date)).getDate()
		if(nowTime.getDate() <= signTime) {
			uni.showToast({
				icon: 'error',
				title: '今天您已经签到过了',
			})
			flag = true
			return
		}
	} else {
		//首次签到得60积分
		val = 60
	}
	await updateIntegralAPI(1,val,integralInfo.value.integral + val,nowTime.getTime())
	Notify({
	  type: 'success',
	  message: `签到获得${val}积分`,
	  duration: 2000,
	})
	getUserIntegral()
	flag = true
}

const toTicketDetail = (id,val) => {
	uni.navigateTo({ url: `/integralPackge/integral-packet/integral-packet?id=${id}&integral=${val}` })
}

const integralInfo = ref([])
const getUserIntegral = async () => {
	const res = await getUserIntegralAPI()
	integralInfo.value = res.result
	console.log(integralInfo.value);
}

const ticketList = ref([])
const getRedTicketList = async () => {
	const res = await getExchangeTicketAPI()
	ticketList.value = res.result
}
onLoad(() => {
	Promise.all([getUserIntegral(),getRedTicketList()])
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
	background: linear-gradient(to bottom,#feefa9,#fee28c);
	padding-bottom: 40rpx;
	.user-info {
		justify-content: space-between;
		margin-top: 30rpx;
		padding: 16rpx 0;
		background-color: #fedf87;
		.info-left {
			padding-left: 40rpx;
			.avator-image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			.left-name {
				margin-left: 20rpx;
				font-size: 12px;
				.integral {
					margin-top: 12rpx;
				}
			}
		}
		.detail-right {
			padding: 10rpx 14rpx 10rpx 22rpx;
			color: #885921;
			background-color: #ffe9a9;
			border-radius: 26rpx 0 0 26rpx;
			font-size: 13px;
		}
	}
}
.integral-mid {
	padding: 20rpx;
	.mid-title {
		text-align: center;
		font-weight: 550;
	}
	.mid-item-block {
		margin-top: 10rpx;
		.mid-item {
				flex: 1;
				border-right: 1px solid #d9d9d9;
				&:last-child {
					border: 0;
				}
				.mid-item-image {
					width: 100rpx;
					height: 100rpx;
				}
				.item-text {
					margin-bottom: 12rpx;
					font-weight: 550;
					font-size: 14px;
				}
				.item-text-tap {
					font-size: 13px;
				}
			}
	}
}
.item-block {
	margin-top: 20rpx;
	padding: 16rpx 0;
	.item-header {
		font-size: 14px;
		padding-right: 24rpx;
		.title {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			color: #080808;
		}
		.change-detail {
			margin: 0 0 0 auto;
			padding: 8rpx 12rpx;
			color: #d5ac36;
			border: 1px solid #eee2af;
			border-radius: 36rpx;
		}
	}
	.item-main {
		flex-wrap: wrap;
		padding: 0 50rpx;
		&::after {
			content: '';
			flex: auto;
		}
		.item {
			width: 27%;
			margin: 30rpx 60rpx 20rpx 0;
			font-size: 11px;
			&:nth-child(3n) {
				margin-right: 0;
			}
			.item-image {
				width: 120rpx;
				height: 120rpx;
			}
			.pack-name {
				font-size: 12px;
			}
			.integral-num {
				color: #c49946;
			}
		}
	}
}
</style>

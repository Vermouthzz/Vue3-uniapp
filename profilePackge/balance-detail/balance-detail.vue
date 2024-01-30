<template>
	<view class="ba-detail-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'网易严选-以严谨的态度...'"></CustomHeader>
		<view class="ba-detail-body">
			<view class="detail-item-block flex-c" v-for="item in cardList" :key="item.change_id">
				<view class="item-date">
					{{item.change_time}}
				</view>
				<view class="item-detail fff flex">
					<view class="item-left flex-c">
						<view class="item-card flex-a">
							<text class="name">卡号:</text>
							<text class="id">{{item.show_id}}</text>
						</view>
						<view class="item-order flex-a">
							<text class="name">订单:</text>
							<text class="id">{{item.order_id ? item.order_id : '--'}}</text>
						</view>
					</view>
					<view class="item-right flex">
						<view class="item-name flex-c">
							<text>充值</text>
							<text class="btm">余额</text>
						</view>
						<view class="item-change flex-c">
							<text class="sign">{{item.change_type == 1 ? '+' : '-'}}{{item.change_num}}</text>
							<text class="btm">{{item.change_type == 0 ? '0.00' : item.change_num}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {getCardDetailAPI} from '../../api/card.js'
const {safeAreaInsets} = uni.getSystemInfoSync()

const cardList = ref([])
const getCardList = async () => {
	const res = await getCardDetailAPI(1)
	cardList.value = res.data
	console.log(cardList.value);
}

onMounted(() => {
	getCardList()
})
</script>

<style lang="scss">
.ba-detail-block {
	height: 100vh;
	box-sizing: border-box;
	.ba-detail-body {
		flex: 1;
		background-color: #efefef;
		.detail-item-block {
			font-size: 13px;
			.item-date {
				text-align: center;
				margin: 8rpx 0;
			}
			.item-detail {
				padding: 24rpx 36rpx;
				.item-left {
					flex: 2;
					color: #656565;
					.name {
						margin-right: 10rpx;
					}
					.item-card {
						margin-bottom: 10rpx;
					}
				}
				.item-right {
					flex: 1;
					justify-content: space-between;
					.sign {
						margin-left: -20rpx;
					}
					.btm {
						margin-top: 10rpx;
					}
				}
			}
		}
	}
}
</style>

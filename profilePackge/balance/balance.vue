<template>
	<view class="balance-block" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<Header :title="'我的余额'"></Header>
		<view class="balance-bd">
			<view class="balance flex-c-a">
				<view class="balance-top">
					余额(元)
				</view>
				<view class="balance-mid flex-c-a">
					<view class="real-balance">
						<text class="dollar">￥</text>
						<text class="price">{{userCardStore.userBalance.num}}</text>
					</view>
					<view class="check-detail">
						<text>查看明细</text>
						<van-icon name="arrow" size="24rpx"></van-icon>
					</view>
				</view>
				<view class="balance-btm">
					<view class="chorge">
						去充值
					</view>
				</view>
			</view>
		</view>
		<LoveList>
			<template #title>
				<view class="love-title">
					热销好物
				</view>
			</template>
		</LoveList>
	</view>
</template>

<script setup>
import Header from '../card/header.vue'
import LoveList from '../../components/LoveList/LoveList.vue'
import {useUserCardStore} from '../../store/useUserCardStore.js'
const userCardStore = useUserCardStore()
const {safeAreaInsets} = uni.getSystemInfoSync()
</script>

<style lang="scss">
page {
	height: 100vh;
	display: flex;
	flex-direction: column;
}
.balance-block {
	background-color: #f4f4f4;
	.balance-bd {
		padding: 16rpx 16rpx 0 16rpx;
		margin-bottom: 16rpx;
		background-color: #ebcaa0;
		.balance {
			padding: 30rpx 0 20rpx;
			color: #fff;
			background: linear-gradient(to right, #fe9990,#fb6c6e);
			.balance-mid {
				margin: 20rpx 0 30rpx;
				.real-balance {
					.dollar {
						margin-bottom: 16rpx;
					}
				}
			}
		}
	}
}
</style>

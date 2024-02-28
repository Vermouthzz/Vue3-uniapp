<template>
	<view class="goods-header flex">
		<view class="header-left-block flex-a" >
			<i class="iconfont icon-left" @tap="toBack"></i>
			<i class="iconfont icon-home right-icon"></i>
		</view>
		<view class="header-right-block flex-a" :style="{height: buttonHeight + 'px'}">
			<i class="iconfont icon-search"></i>
			<input class="header-right-input" type="text" placeholder="午餐肉">
		</view>
	</view>
</template>

<script setup>
import {onReady} from '@dcloudio/uni-app'
import { ref } from 'vue';
const toBack = () => {
	uni.navigateBack()
}
const buttonHeight = ref(0)
onReady(() => {
	const {height} = uni.getMenuButtonBoundingClientRect()
	buttonHeight.value = height
})
</script>

<style lang="scss">
	.goods-header {
		margin-top: 8rpx;
		.header-left-block {
			position: relative;
			width: 20%;
			margin: 0 26rpx 0 30rpx;
			border: 1px solid #fafafa;
			border-radius: 30rpx;
			.left-icon {
				margin: 0 30rpx 0 16rpx;
				&::after {
					content: '';
					position: absolute;
					top: 14rpx;
					left: 68rpx;
					display: block;
					width: 2rpx;
					height: 36rpx;
					background-color: #ccc;
				}
			}
		}
		.header-right-block {
			width: 46%;
			background-color: #fafafa;
			.header-right-input {
				font-size: 26rpx;
			}
		}
	}
</style>
<template>
	<view class="goods-header flex" :style="{height: headerHeight + 'px'}">
		<view class="header-left-block flex-a" >
			<i class="iconfont icon-left" @tap="toBack"></i>
			<i class="iconfont icon-home right-icon"></i>
		</view>
		<view class="header-right-block flex-a" >
			<i class="iconfont icon-search"></i>
			<input class="header-right-input" type="text" placeholder="午餐肉">
		</view>
	</view>
</template>

<script setup>
import {onReady} from '@dcloudio/uni-app'
import { ref } from 'vue';
import {middle} from '../../../hooks/useMiddle.js'
const toBack = () => {
	uni.navigateBack()
}
const headerHeight = ref(20)
onReady(() => {
	middle('.goods-header').then(res => headerHeight.value = res)
})
</script>

<style lang="scss">
	.goods-header {
		padding: 12rpx 0;
		.header-left-block {
			position: relative;
			width: 20%;
			margin: 0 26rpx 0 30rpx;
			border: 1px solid #ccc;
			border-radius: 30rpx;
			font-size: 36rpx;
			.icon-left {
				margin: 0 42rpx 0 16rpx;
				&::after {
					content: '';
					position: absolute;
					top: 12rpx;
					left: 62rpx;
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
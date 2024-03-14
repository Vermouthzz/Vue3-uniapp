<template>
	<view class="goods-arguments flex-c">
		<view class="arguments-title">
			商品参数
		</view>
		<view class="arguments-item-block">
			<view class="arguments-item" :class="{moreItem: index > 2 ? true: false}" v-for="(item,index) in arguments" :key="index" :style="{display: isShow ? 'flex':''}">
				<view class="item-name">
					{{item.parameter_name}}
				</view>
				<view class="item-val">
					{{item.parameter_value}}
				</view>
			</view>
		</view>
		<view class="tap-more" @tap="showMore" v-show="!isShow">
			<text>点击查看更多</text>
			<i class="iconfont icon-down"></i>
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'
defineProps({
	arguments: {
		type: Array
	}
})
//点击展开更多
const isShow = ref(false)
const showMore = () => {
	isShow.value = true
}
</script>

<style lang="scss">
	.goods-arguments {
		padding: 0 20rpx;
		margin-top: 12rpx;
		background-color: #fff;
		.arguments-title {
			padding: 24rpx 0;
			font-weight: 550;
			font-size: 15px;
			border-bottom: 1px dotted #ccc;
		}
		.arguments-item-block {
			.arguments-item {
				display: flex;
				padding: 16rpx 0;
				font-size: 13px;
				border-bottom: 1px dotted #ccc;
				&:last-child {
					border-bottom: 0;
				}
				.item-name {
					width: 25%;
					color: #969696
				}
					
				.item-val {
					flex: 1;
					color: #333333;
				}
				&.moreItem {
					display: none;
				}
			}
		}
		.tap-more {
			width: 200rpx;
			margin: 0 auto;
			padding: 20rpx 0;
			font-size: 12px;
			color: #616161;
			.icon-down {
				font-size: 24rpx;
				color: #616161;
			}
		}
	}
</style>
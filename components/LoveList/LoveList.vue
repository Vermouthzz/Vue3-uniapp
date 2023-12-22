<template>
	<view class="love-block flex-c-a fff">
		<slot name="title"></slot>
		<view class="love-list-block flex">
			<view class="love-list list-left">
				<block v-for="i in 6" :key="i">
					<GoodsItem></GoodsItem>
				</block>
			</view>
			<view class="love-list">
				<block v-for="i in 6" :key="i">
					<GoodsItem></GoodsItem>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
import GoodsItem from '../GoodsItem/GoodsItem.vue'
</script>

<style lang="scss" scoped>
	.love-block {
		margin-top: 12px;
		padding: 0 20rpx;
		background-color: #fff;
		box-sizing: border-box;
		.love-list-block {
			width: 100%;
			justify-content: space-between;
			box-sizing: border-box;
			.list-left {
				margin-right: 24rpx;
			}
			.love-list{
				flex: 1;
			}
		}
	}
</style>
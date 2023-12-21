<template>
	<view class="love-block flex-c-a fff">
		<slot name="title"></slot>
		<view class="love-list flex">
			<view class="love-list-left">
				<block v-for="i in 6" :key="i">
					<GoodsItem></GoodsItem>
				</block>
			</view>
			<view class="love-list-right">
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
		background-color: #fff;
		box-sizing: border-box;
		.love-list {
			justify-content: space-between;
			padding: 0 18rpx;
			box-sizing: border-box;
			.love-list-left {
				flex: 1;
				margin-right: 24rpx;
				:deep(.goods-block) {
					margin-bottom: 50rpx;
				}
			}
			.love-list-right {
				flex: 1;
				:deep(.goods-block) {
					margin-bottom: 50rpx;
				}
			}
		}
	}
</style>
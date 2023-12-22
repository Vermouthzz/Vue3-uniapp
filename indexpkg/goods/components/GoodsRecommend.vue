<template>
	<view class="more-recommend">
		<view class="more-recommend-title">
			更多推荐
		</view>
		<!-- 更多推荐item -->
		<view class="recommend-list-block flex">
			<view class="recommend-list">
				<block v-for="i in 5" :key="i">
					<GoodsItem></GoodsItem>
				</block>
			</view>
			<view class="recommend-list">
				<block v-for="i in 5" :key="i">
					<GoodsItem></GoodsItem>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.more-recommend {
		margin: 14rpx 0 30rpx;
		padding: 0 16rpx;
		background-color: #fff;
	
		.more-recommend-title {
			padding: 30rpx 0 24rpx;
			font-size: 15px;
		}
		.recommend-list-block {
			justify-content: space-between;
			.recommend-list {
				flex: 1;
				&:first-child {
					margin-right: 26rpx;
				}
			}
		}
	}
</style>
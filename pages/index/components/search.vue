<template>
	<view class="search-block-index">
		<navigator hover-class="none" url="/indexpkg/search/search" class="search-area-index">
			<van-icon name="search" color="#323232" class="sea-icon" size="32rpx" />
			<input class="search-input" type="text" placeholder="请输入">
			<button class="btn-search flex-a">搜索</button> 
		</navigator>
	</view>
</template>

<script setup>
const toSearch = () => {
	uni.navigateTo({
		url: 'search'
	})
}
</script>

<style lang="scss" scoped>
	.search-block-index {
		padding: 0 20rpx;
		.search-area-index {
			width: 100%;
			height: 64rpx;
			border: 1px solid #d93d46;
			border-radius: 36rpx;
			display: flex;
			box-sizing: border-box;
			.sea-icon {
				margin: 16rpx 10rpx 10rpx 16rpx;
			}
			.search-input {
				flex: 1;
				font-size: 13px;
				padding: 8rpx 0;
			}
			.btn-search {
				justify-content: center;
				margin-top: -2rpx;
				margin-right: -2rpx;
				 //覆盖父元素边框
				width: 112rpx;
				font-size: 14px;
				border-radius: 36rpx;
				background-color: #f1373d;
				color: #fff;
			}
		}
	}
</style>
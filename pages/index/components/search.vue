<template>
	<view class="search-block-index">
		<navigator hover-class="none" url="/indexpkg/search/search" class="search-area-index">
			<!-- <uni-icons class="sea-icon" type="search" size="20"></uni-icons> -->
			<van-icon name="search" color="#323232" class="sea-icon" size="32rpx" />
			<input class="search-input" type="text" placeholder="请输入">
			<button class="btn-search">搜索</button> 
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
			// height: 56rpx;
			border: 1px solid #d93d46;
			border-radius: 30px;
			display: flex;
			box-sizing: border-box;
			.sea-icon {
				margin: 16rpx 10rpx 10rpx 16rpx;
			}
			.search-input {
				flex: 1;
				padding: 10rpx 0;
				font-size: 14px;
			}
			.btn-search {
				margin-right: -2rpx;
				margin-top: -4rpx;
				 //覆盖父元素边框
				width: 120rpx;
				font-size: 14px;
				line-height: 70rpx;
				text-align: center;
				border-radius: 15px;
				background-color: #f1373d;
				color: #fff;
			}
		}
	}
</style>
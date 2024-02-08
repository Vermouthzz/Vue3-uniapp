<template>
	<view class="cate-goods-block">
		<view class="cate-goods-title flex-c-a">
			<text class="middle">四季款</text>
		</view>
		<view class="cate-goods-main flex">
			<view class="cate-goods-item">
				<GoodsItem></GoodsItem>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps(['list'])
</script>

<style lang="scss" scoped>
.cate-goods-block {
	.cate-goods-title {
		.middle {
			margin-bottom: 18rpx;
		}
	}
	.cate-goods-main {
		.cate-goods-item {
			margin-right: 18rpx;
			&:nth-child(2n) {
				margin-right: 0;
			}
		}
	}
}
</style>
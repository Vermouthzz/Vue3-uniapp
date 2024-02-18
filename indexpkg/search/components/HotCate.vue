<template>
	<view class="hot-cate">
		<view class="title" >
			热门分类
		</view>
		<view class="hot-cate-list flex">
			<view class="hot-cate-item flex-c-a" v-for="(item,index) in list" :key="index">
				<image class="hot-cate-image" :src="item.img_url"></image>
				<view class="name">
					{{item.category_name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps(['list'])
</script>

<style lang="scss">
	.hot-cate {
		margin-top: 18px;
		padding-left: 36rpx;
		.hot-cate-list {
			flex-wrap: wrap;
			.hot-cate-item {
				width: 20%;
				justify-content: space-between;
				// margin-right: 33rpx;
				padding-right: 33rpx;
				padding-bottom: 30rpx;
				// margin-bottom: 30rpx;
				box-sizing: border-box;
				.hot-cate-image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 20rpx;
					margin-bottom: 30rpx;
				}
				.name {
					font-size: 12px;
				}
			}
		}
	}
</style>
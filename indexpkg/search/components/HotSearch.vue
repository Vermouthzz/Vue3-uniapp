<template>
	<view class="hot-search flex-c">
		<view class="title">
			{{title}}
			<slot name="delete">
				
			</slot>
		</view>
		<view class="hot-search-list flex">
			<view class="hot-search-item" v-for="i in 8" :key="i">
				睡衣
			</view>
		</view>
	</view>
</template>

<script setup>
defineProps(['title','list'])
</script>

<style lang="scss">
	.hot-search {
		.hot-search-list {
			flex-wrap: wrap;
			.hot-search-item {
				border: 1px solid #7f7f7f;
				padding: 8rpx 14rpx;
				margin-right: 28rpx;
				margin-bottom: 24rpx;
				font-size: 12px;
			}
		}
	}
</style>
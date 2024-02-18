<template>
	<view class="hot-search flex-c">
		<view class="title flex-a">
			{{title}}
			<slot name="delete">
				
			</slot>
		</view>
		<view class="hot-search-list flex">
			<view class="hot-search-item" v-for="item in list" :key="item" @tap="onTapItem(item)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script setup>
defineProps(['title','list','item'])
const emits = defineEmits(['itemChange'])

const onTapItem = (item) => {
	emits('itemChange', item)
}
</script>

<style lang="scss">
	.hot-search {
		.title {
			justify-content: space-between;
		}
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
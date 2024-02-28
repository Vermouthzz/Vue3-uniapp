<template>
	<view class="search-block-index">
		<navigator hover-class="none" url="/indexpkg/search/search" class="search-area-index">
			<i class="iconfont icon-search"></i>
			<input class="search-input" type="text" placeholder="我是">
			<view class="btn-search flex-a">搜索</view>
		</navigator>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps(['list'])

// const index = ref(0)
// const placeHolder = computed(() => props.list[index.value])
// const searchInterval = setInterval(() => {
// 	index.value > props.list.length - 1 ? index.value = 0 : index.value++
// }, 3000)
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
			.iconfont {
				margin: 16rpx 10rpx 10rpx 16rpx;
			}
			.search-input {
				flex: 1;
				height: 100%;
				font-size: 26rpx;
			}
			.btn-search {
				justify-content: center;
				 //覆盖父元素边框
				width: 112rpx;
				height: 100%;
				font-size: 26rpx;
				border-radius: 36rpx;
				background-color: #f1373d;
				color: #fff;
			}
		}
	}
</style>
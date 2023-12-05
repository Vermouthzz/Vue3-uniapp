<template>
	<header class="index-header" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<block v-if="!scroll">
			<image class="index-header-img" src="https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"></image>
		</block>
		<view class="search-box" v-else>
			<Search></Search>
		</view>
	</header>
</template>

<script setup>
	import Search from './Search.vue'
	const props = defineProps({
		scroll: {
			type: Boolean,
		}
	})
	const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss">
	.index-header {
		padding-left: 10rpx;
		.index-header-img {
			width: 240rpx;
			height: 80rpx;
		}
		.search-box {
			width: 75%;
			margin: 16rpx 0;
		}
	}
</style>
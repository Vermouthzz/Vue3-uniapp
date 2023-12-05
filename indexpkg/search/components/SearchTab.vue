<template>
	<view class="search-tabs flex fixed">
		<view class="tab-item-block flex-a" @tap="reSortList(1)" :style="{color: types == 1 ? '#a02f40' : ''}">
			综合
		</view>
		<view class="tab-item-block flex-a" @tap="reSortList('price')">
			<text :style="{ color: types == 2 ? '#a02f40' : types == 3 ? '#a02f40' : ''}">价格</text>
			<view class="top-btm flex-c">
				<van-icon name="arrow-up" size="24rpx" :color="types == 2 ? '#a02f40' : ''" class="icon-up"></van-icon>
				<van-icon name="arrow-down" size="24rpx" :color="types == 3 ? '#a02f40' : ''" class="icon-down" ></van-icon>
			</view>
		</view>
		<view class="tab-item-block flex-a" @tap="reSortList(4)" :style="{color: types == 4 ? '#a02f40' : ''}">
			销量
		</view>
	</view>
</template>

<script setup>
import {inject, ref} from 'vue'
const lowerOrupper = ref(false) //控制升价与降价
const types = inject('type')
const reSortList = (val) => {
	if(val == 'price') {
		lowerOrupper.value ? types.value = 3 : types.value = 2
		lowerOrupper.value = !lowerOrupper.value
	} else {
		types.value = val
	}
}
</script>

<style lang="scss">
	.search-tabs {
		height: 80rpx;
		border-bottom: 1px solid #d9d9d9;
		border-top: 1px solid #d9d9d9;
		&.fixed {
			width: 100%;
			position: sticky;
			top: 0;
			left: 0;
			z-index: 888;
			background-color: #fff;
		}
		.tab-item-block {
			flex: 1;
			justify-content: center;
			padding: 20rpx 0;
			&.active {
				color: #d12538;
			}
			.top-btm {
				justify-content: center;
				margin-left: 8rpx;
				.icon-up {
					margin-bottom: -10rpx;
				}
				.icon-down {
					margin-top: 2rpx;
				}
			}
		}
	}
</style>
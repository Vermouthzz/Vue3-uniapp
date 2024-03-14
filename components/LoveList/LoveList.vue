<template>
	<view class="love-block flex-c fff">
		<slot name="title"></slot>
		<view class="love-list-block flex">
			<view class="love-list list-left">
				<slot name="rank"></slot>
				<block v-for="(item, index) in leftList" :key="index">
					<GoodsItem :goodsItem="item"></GoodsItem>
				</block>
			</view>
			<view class="love-list">
				<block v-for="(item, index) in rightList" :key="index">
					<GoodsItem :goodsItem="item">
					</GoodsItem>
				</block>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from "vue"
const props = defineProps(['list'])
const leftList = computed(() => {
	return props.list?.map((item,index) => {
		if(index % 2 != 0) return item
	}).filter(i => i)
})
const rightList = computed(() => {
	return props.list?.map((item,index) => {
		if(index % 2 == 0) return item
	}).filter(i => i)
})
</script>

<style lang="scss" scoped>
	.love-block {
		margin-top: 12px;
		padding: 0 20rpx;
		background-color: #fff;
		box-sizing: border-box;
		.love-list-block {
			justify-content: space-between;
			box-sizing: border-box;
			.list-left {
				margin-right: 24rpx;
			}
			.love-list{
				flex: 1;
			}
		}
	}
</style>
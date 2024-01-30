<template>
	<view class="love-block flex-c-a fff">
		<slot name="title"></slot>
		<view class="love-list-block flex">
			<view class="love-list list-left">
				<block v-for="(item, index) in leftList" :key="index">
					<GoodsItem :goodsItem="item"></GoodsItem>
				</block>
			</view>
			<view class="love-list">
				<block v-for="(item, index) in rightList" :key="index">
					<GoodsItem :goodsItem="item"></GoodsItem>
				</block>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from "vue"
const props = defineProps(['list'])
const leftList = ref([])
const rightList = ref([])

const speartFun = () => {
	leftList.value = props.list?.map((item,index) => {
		if(index % 2 != 0) return item
	}).filter(i => i)
	rightList.value = props.list?.map((item,index) => {
		if(index % 2 == 0) return item
	}).filter(i => i)
}
onMounted(() => {
	speartFun()
})
</script>

<style lang="scss" scoped>
	.love-block {
		margin-top: 12px;
		padding: 0 20rpx;
		background-color: #fff;
		box-sizing: border-box;
		.love-list-block {
			width: 100%;
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
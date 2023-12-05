<template>
	<view class="tab-brand flex" :class="[props.scrollTop > 170 ? 'fixed' : '']">
		<view class="tab-item-block flex-a" @tap="reSortList(1)" :style="{color: props.type == 1 ? '#a02f40' : ''}">
			综合
		</view>
		<view class="tab-item-block flex-a" @tap="reSortList('price')">
			<text :style="{ color: types == 2 ? '#a02f40' : types == 3 ? '#a02f40' : ''}">价格</text>
			<view class="top-btm flex-c">
				<van-icon name="arrow-up" size="24rpx" :color="types == 2 ? '#a02f40' : ''" class="icon-up"></van-icon>
				<van-icon name="arrow-down" size="24rpx" :color="types == 3 ? '#a02f40' : ''" class="icon-down" ></van-icon>
			</view>
		</view>
		<view class="tab-item-block flex-a" @tap="reSortList(4)" :style="{color: props.type == 4 ? '#a02f40' : ''}">
			销量
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'
const props = defineProps(['scrollTop','type'])
const emits = defineEmits(['update:type'])
const lowerOrupper = ref(false) //控制升价与降价
const types = ref(1)
const reSortList = (val) => {
	if(val == 'price') {
		lowerOrupper.value ? types.value = 3 : types.value = 2
		lowerOrupper.value = !lowerOrupper.value
	} else {
		types.value = val
	}
	emits('update:type', types.value)
}
</script>

<style lang="scss">
	.tab-brand {
		height: 80rpx;
		border-bottom: 1px solid #d9d9d9;
		background-color: #fafafa;
		&.fixed {
			width: 100%;
			position: fixed;
			top: 114rpx;
			left: 0;
			background-color: #fafafa;
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
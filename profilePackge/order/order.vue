<template>
	<view class="order-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<view class="order-header flex-c">
			<Header :title="'我的订单'"></Header>
			<view class="header-tab flex fff">
				<view class="tab-item-block flex-a" v-for="(item,index) in orderTabs" :key="index">
					<view class="tab-item" @tap="onTapTab(index)" :class="{active: index == activeIndex}">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="order-body flex-c">
			<block v-for="item in List" :key="item.order_id">
				<order-item :item="item"></order-item>
			</block>
		</view>
	</view>
</template>

<script setup>
import {onLoad,onShow} from '@dcloudio/uni-app'
import {computed, ref, watchEffect} from 'vue'
import Header from '../card/header.vue'
import OrderItem from './components/OrderItem.vue'
import {getOrderListAPI} from '../../api/order.js'
import {useOrderStore} from '../../store/useOrderStore.js'
const orderStore = useOrderStore()
const {safeAreaInsets} = uni.getSystemInfoSync()

const orderTabs = ref([
	{ name: '全部' },
	{ name: '待付款' },
	{ name: '待发货' },
	{ name: '已发货' },
	{ name: '待评价' }
])
const activeIndex = ref(0)






const onTapTab = (val) => {
	activeIndex.value = val
}

const List = computed(() => {
	let i = activeIndex.value
	if(i == 0) {
		return orderStore.orderList
	} else if(i == 1) {
		return orderStore.orderList.filter(item => item.order_status == 0)
	} else if(i == 2) {
		return orderStore.orderList.filter(item => item.order_status == 1)
	} else if(i == 3) {
		return orderStore.orderList.filter(item => item.order_status == 2)
	} else if(i == 4) {
		return orderStore.orderList.filter(item => item.order_status == 3)
	}
})


onShow((option) => {
	activeIndex.value = option.index
	orderStore.getOrderList()
})
</script>

<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	background-color: #f3f3f3;
}
.order-block {
	height: 100%;
	box-sizing: border-box;
	.order-header {
		background-color: #fafafa;
		.header-top {
			margin-top: 22rpx;
			.title {
				margin-left: 12rpx;
			}
		}
		.header-tab {
			position: sticky;
			margin-top: 20rpx;
			border-bottom: 1px solid #f6f6f6;
			.tab-item-block {
				flex: 1;
				justify-content: center;
				.tab-item {
					padding: 20rpx 16rpx;
					&.active {
						border-bottom: 1px solid #d82740;
					}
				}
			}
		}
	}
	.order-body {
		flex: 1;
		overflow: scroll;
		padding-bottom: 16rpx;
	}
}
</style>

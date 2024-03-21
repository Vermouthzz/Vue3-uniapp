<template>
	<view class="order-block flex-c" :style="{paddingTop: `${safeAreaInsets.top}px`, paddingBottom: `${safeAreaInsets.bottom}px`}">
		<view class="order-header flex-c">
			<CustomHeader :title="'我的订单'"></CustomHeader>
			<view class="header-tab flex fff">
				<view class="tab-item-block flex-a" v-for="(item,index) in orderTabs" :key="index">
					<view class="tab-item" @tap="onTapTab(item,index)" :class="{active: index == currentItem}">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<swiper class="swiper-list" :current="currentItem" @change="onChange">
			<swiper-item class="order-body flex-c"  v-for="item in orderTabs" :key="item.name">
				<view class="init" v-if="item.init && !item.list.length"></view>
				<block v-else-if="!item.init && item.list.length">
					<block v-for="subItem in item.list" :key="subItem.order_id">
						<order-item :item="subItem" @onReload="onReload"></order-item>
					</block>
				</block>
				<van-empty v-else description="还没有任何订单呢" />
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
import {onLoad,onShow} from '@dcloudio/uni-app'
import {computed, ref, watchEffect} from 'vue'
import OrderItem from './components/OrderItem.vue'
import {getOrderListAPI} from '../../api/order.js'
import {useRemainTime} from '../../hooks/useRemainTime.js'
const {safeAreaInsets} = uni.getSystemInfoSync()

const orderTabs = ref([
	{ name: '全部', type: 5, list: [], init: true },
	{ name: '待付款', type: 0, list: [], init: true },
	{ name: '待发货', type: 1, list: [], init: true },
	{ name: '已发货', type: 2, list: [], init: true },
	{ name: '待评价', type: 3, list: [], init: true }
])
const getOrderList = async () => {
	const type = orderTabs.value[currentItem.value].type
	const res = await getOrderListAPI(type)
	orderTabs.value[currentItem.value].list = res.data?.map(item => {
		return {
			...item,
			remainTime: useRemainTime(item)
		}
	})
	orderTabs.value[currentItem.value].init = false
}
const onTapTab = (item,index) => {
	currentItem.value = index
}
//swiper切换
const currentItem = ref(0)
const onChange = (e) => {
	currentItem.value = e.detail.current
	getOrderList()
}

const onReload = () => {
	getOrderList()
}

const firstLoad = ref(false)
onShow(() => {
	if(firstLoad.value) {
		getOrderList()
	}
})

onLoad((option) => {
	if(!firstLoad.value) {
		currentItem.value = option.index
		getOrderList()
		firstLoad.value = true
	}
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
		:deep(.common-header) {
			background-color: #f3f3f3;
		}
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
	.swiper-list {
		flex: 1;
		.order-body {
			width: 100%;
			height: 100%;
			overflow: scroll;
			padding-bottom: 16rpx;
			:deep(.van-empty) {
				margin-top: 100rpx;
			}
			.init {
				height: 100%;
				background-color: #f4f4f4;
			}
		}
	}
}
</style>

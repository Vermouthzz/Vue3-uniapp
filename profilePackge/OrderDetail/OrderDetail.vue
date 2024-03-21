<template>
	<view class="order-detail-box flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'订单详情'" :two="double"></CustomHeader>
		<scroll-view class="order-detail-bd flex-c" scroll-y="true" enable-flex="true">
			<detail-addres v-model:flag="cancelFlag"></detail-addres>
			<block v-for="(item,index) in orderStore.orderItem.children" :key="index">
				<order-packge :item="item" :index="index"></order-packge>
			</block>
			<view class="order-id-block fff flex">
				<view class="id-left flex-c">
					<text class="id-name">订单编号：<text class="id-value">{{orderStore.orderItem.order_id}}</text></text>
					<text class="id-name">下单时间：<text class="id-value">{{orderStore.orderItem.create_time}}</text></text>
				</view>
				<view class="copy-right" @tap="onCopy">
					复制
				</view>
			</view>
			<detail-pay :spec="orderStore.orderItem.spec" :li_nums="orderStore.orderItem.li_nums"></detail-pay>
			<view class="recommend">
				<LoveList :list="recommendList">
					<template #title>
						<view class="love-title">
							人气推荐
						</view>
					</template>
				</LoveList>
			</view>
			<view class="btm"></view>
		</scroll-view>
		<view class="order-detail-footer flex-a fff" v-show="orderStore.orderItem.order_status == 0">
			<text>实付：￥{{orderStore.orderItem.pay_price}}</text>
			<view class="footer-right flex">
				<view class="cancel-order flex-a common" @tap="onCancelOrder">
					取消订单
				</view>
				<view class="pay-order flex-a common" @tap="onPayOrder">
					付款<van-count-down @finish="onFinish" :time="orderStore.orderItem.remainTime" format="mm:ss" />
				</view>
			</view>
		</view>
		<pay-popup v-model:show="show" :price="orderStore.orderItem.pay_price?.toFixed(2)"></pay-popup>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import OrderPackge from './components/OrderPackge.vue'
import DetailAddres from './components/DetailAddres.vue'
import DetailPay from './components/DetailPay.vue'
import PayPopup from '../components/PayPopup.vue'
import { computed, ref } from 'vue'
import {useOrderStore} from '../../store/useOrderStore.js'
import {getOrderRecommendList} from '../../api/order.js'
const {safeAreaInsets} = uni.getSystemInfoSync()
const orderStore = useOrderStore()
//订单状态
const status = ['已取消','待付款','待发货','已发货','交易成功','交易成功']
const orderStatus = computed(() => status[props.item?.order_status * 1 + 1])

//复制功能
const onCopy = () => {
	uni.setClipboardData({
		data: orderStore.orderItem.order_id,
		showToast: false
	})
}


//取消订单
const cancelFlag = computed(() => {
	orderStore.orderItem.order_status == 0 ? true : false
})
const onCancelOrder = () => {
	orderStore.onCancelOrderItem(orderStore.orderItem.order_id)
	cancelFlag.value = true
}

//倒计时结束
const onFinish = () => {
	onCancelOrder()
}

const show = ref(false) //控制支付弹窗
const onPayOrder = () => {
	show.value = true
}

const recommendList = ref([])
const getRecommendList = async () => {
	const res = await getOrderRecommendList(orderStore.orderItem.order_id)
	recommendList.value = res.result
}


const double = ref(false)

onLoad((options) => {
	double.value = options.to == 2 ? true : false
	getRecommendList()
})
</script>

<style lang="scss">
.wait-pay {
	position: absolute;
	right: 26rpx;
	font-size: 14px;
	color: #d03343;
}
page {
	height: 100vh;
	background-color: #f3f3f3 !important;
}
.order-detail-box {
	height: 100%;
	box-sizing: border-box;
	.order-detail-bd {
		flex: 1;
		overflow: scroll;
		.change-address {
			padding: 12rpx 0;
			border-top: 1px solid #d9d9d9;
			overflow: hidden;
			.change-item {
				float: right;
				padding: 16rpx 20rpx;
				margin-right: 20rpx;
				border: 1px solid #303030;
			}
		}
		.order-id-block {
			justify-content: space-between;
			padding: 30rpx 20rpx;
			margin-top: 12rpx;
			font-size: 12px;
			.id-left {
				.id-name {
					color: #7a7a7a;
					&:first-of-type {
						margin-bottom: 10rpx;
					}
				}
				.id-value {
					color: #383838;
					margin-left: 36rpx;
				}
			}
			.copy-right {
				height: 46rpx;
				line-height: 46rpx;
				padding: 0 24rpx;
				border: 1px solid #333;
			}
		}
		.btm {
			height: 84rpx;
		}
	}
	.order-detail-footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		justify-content: space-between;
		padding: 16rpx 24rpx;
		font-size: 12px;
		box-sizing: border-box;
		.footer-right {
			.common {
				padding: 12rpx 24rpx;
				border: 1px solid #bebebe;
			}
			.pay-order {
				color: #bd3440;
				border-color: #ffd7dd;
				margin-left: 16rpx;
				:deep(.van-count-down) {
					margin-left: 6rpx;
					font-size: 11px;
					color: #bd3440;
				}
			}
		}
	}
}
</style>

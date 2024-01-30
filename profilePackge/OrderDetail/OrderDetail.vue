<template>
	<view class="order-detail-box flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'订单详情'" :two="double"></CustomHeader>
		<scroll-view class="order-detail-bd flex-c" scroll-y="true" enable-flex="true">
			<view class="detail-address-block fff">
				<view class="address-item flex-c">
					<view class="address">
						<!-- 江西省南昌市新建区白水湖管理处华东交通大学北区 -->
						{{address}}
					</view>
					<view class="phone-name flex">
						<text class="name">{{orderStore.orderItem.adress_name}}</text>
						<text>{{phone}}</text>
					</view>
				</view>
				<view class="change-address" v-show="!cancelFlag">
					<view class="change-item">
						修改地址
					</view>
				</view>
			</view>
			<block v-for="(item,index) in cartStore.selectedItems" :key="index">
				<packge-item :item="item" :index="index">	
					<template #title>
						<view class="wait-pay">
							{{orderStatus}}
						</view>
					</template>
				</packge-item>
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
			<view class="price-fee fff flex-c">
				<view class="item-block flex" v-for="(item,index) in orderStore.orderItem.spec.discount_info" :key="index">
					<text class="item-left">{{item.name}}：</text>
					<text class="item-right">{{item.value}}</text>
				</view>
				<view class="item-block flex all_price">
					<text class="item-left">{{orderStore.orderItem.spec.pay.name}}：</text>
					<text class="item-right">{{orderStore.orderItem.spec.pay.value}}<text v-show="orderStore.orderItem.li_nums > 0">(含礼品卡￥{{orderStore.orderItem.li_nums}})</text></text>
				</view>
		</view>
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
		<pay-popup v-model:show="show" :price="orderStore.orderItem.pay_price.toFixed(2)"></pay-popup>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {storeToRefs} from 'pinia'
// import CommonList from '../components/CommonList.vue'
import PackgeItem from '../create-order/components/PackgeItem.vue'
import PayPopup from '../components/PayPopup.vue'
import {useCartStore} from '../../store/useCartStore.js'
import {useAddressStore} from '../../store/useAddressStore.js'
import { computed, ref } from 'vue'
import {useOrderStore} from '../../store/useOrderStore.js'
import {useUserCardStore} from '../../store/useUserCardStore.js'
import {getOrderRecommendList} from '../../api/order.js'
const {safeAreaInsets} = uni.getSystemInfoSync()
const orderStore = useOrderStore()
const addressStore = useAddressStore()
const cartStore = useCartStore()
const userCardStore = useUserCardStore()
const { userCard } = storeToRefs(userCardStore)

//地址
const address = computed(() => addressStore.selectedAddress.address.split(" ").join('') + addressStore.selectedAddress.detail_adrs)
const phone = computed(() => orderStore.orderItem.contact?.slice(0,3) + '****' + orderStore.orderItem.contact?.slice(7))
//倒计时

//订单状态
const orderStatus = computed(() => {
	return orderStore.orderItem.order_status == -1 ? '已取消' : orderStore.orderItem.order_status == 0 ? '待付款' : '待发货'
})

//复制功能
const onCopy = () => {
	
}

const updateStatus = () => {
	orderStore.updateItem(-1,orderStore.orderItem.order_id)
	if(userCard.value[0].checked) userCardStore.updateCardNum(orderStore.orderItem.order_id,-1,0)
}

//取消订单
const cancelFlag = ref(false)
const onCancelOrder = () => {
	updateStatus()
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
	.order-detail-bd {
		flex: 1;
		overflow: scroll;
		.detail-address-block {
			color: #333;
			font-size: 14px;
			.address-item {
				padding: 48rpx 30rpx 40rpx 	24rpx;
				.address {
					margin-bottom: 12rpx;
				}
				.phone-name {
					font-size: 12px;
					color: #7e7e7e;
					.name {
						margin-right: 6rpx;
					}
				}
			}
		}
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
		.price-fee {
			padding: 16rpx 0rpx 16rpx 20rpx;
			margin-top: 12rpx;
			.item-block {
				margin-bottom: 10rpx;
				font-size: 13px;
				.item-left {
					flex: 1;
					color: #7a7a7a;
				}
				.item-right {
					flex: 2;
					margin-left: 20rpx;
				}
				&:last-of-type {
					margin: 0;
				}
			}
			.all_price {
				padding-bottom: 18rpx;
				border-bottom: 1px solid #d6d6d6;
				color: #a4323c;
				.item-left {
					color: #a4323c;
				}
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

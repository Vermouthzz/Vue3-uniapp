<template>
	<view class="order-item-block flex-c fff" @tap="toDetail">
		<view class="order-item-top">
			订单编号：{{item?.order_id}}
		</view>
		<view class="order-item flex" v-for="(i,index) in item?.children" :key="index">
			<image class="order-image" :src="i.pic"></image>
			<view class="goods-name-sku flex-c">
				<view class="goods-name">
					{{i.goods_name}}
				</view>
				<text class="goods-sku">{{i.spec}}</text>
			</view>
			<view class="packge flex-c">
				<text class="packge-name">包裹{{index + 1}}</text>
				<text class="order-status">{{item?.order_status == 0 ? '待付款' : item?.order_status == 1 ? '已付款' : '已取消'}}</text>
			</view>
		</view>
		<view class="should-pay flex-a" v-show="item?.order_status == 0">
			<view class="left flex">
				<text>应付:</text>
				<text class="pay-price">￥{{item?.pay_price}}</text>
			</view>
			<view class="right flex">
				<view class="btn-order cancel-order">
					取消订单
				</view>
				<view class="btn-order flex-a pay-order" @tap="onPay">
					付款 <van-count-down @finish="onFinish" :time="item?.remainTime" format="mm:ss" />
				</view>
			</view>
		</view>
	</view>
	<pay-popup v-model:show="show" :price="item.pay_price"></pay-popup>
</template>

<script setup>
import { ref } from 'vue';
import PayPopup from '../../components/PayPopup.vue'
import {useOrderStore} from '../../../store/useOrderStore.js'
const orderStore = useOrderStore()
const props = defineProps(['item'])


const onFinish = () => {
	orderStore.updateItem(-1,props.item.order_id)
}

const toDetail = () => {
	orderStore.getOrderItem(props.item.order_id)
	uni.navigateTo({
		url: `/profilePackge/OrderDetail/OrderDetail?to=1`
	})
}

const show = ref(false)
const onPay = () => {
	show.value = true
}
</script>

<style lang="scss">
	.order-item-block {
		margin-top: 12rpx;
		padding-left: 20rpx;
		.order-item-top {
			padding: 20rpx 0;
			font-size: 13px;
		}
		.order-item {
			padding: 24rpx 0;
			font-size: 14px;
			border-top: 1px solid #e6e6e6;
			.order-image {
				flex-shrink: 0;
				width: 160rpx;
				height: 160rpx;
				margin-right: 20rpx;
			}
			.goods-name-sku {
				width: 420rpx;
				margin-top: 24rpx;
				.goods-sku {
					margin-top: 4rpx;
					color: #6f6f6f;
					font-size: 12px;
				}
			}
			.packge {
				flex-shrink: 0;
				margin: 24rpx 24rpx 0 30rpx;
				.order-status {
					font-size: 13px;
					color: #dd2f50;
				}
			}
		}
		.should-pay {
			padding: 16rpx 0;
			border-top: 1px solid #e6e6e6;
			justify-content: space-between;
			font-size: 12px;
			.left {
				.pay-price {
					margin-left: 8rpx;
				}
			}
			.right {
				.btn-order {
					padding: 16rpx 18rpx;
					border: 1px solid #c1c1c1;
					color: #363636;
				}
				.pay-order {
					margin: 0 24rpx 0 18rpx;
					color: #b93249;
					border-color: #b93249;
					:deep(.van-count-down) {
						margin-left: 6rpx;
						font-size: 11px;
						color: #b93249;
					}
				}
			}
		}
	}
</style>
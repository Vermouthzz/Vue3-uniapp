<template>
	<van-popup
	  :show="show"
	  closeable
	  position="bottom"
	  custom-style="height: 40%"
	  @close="onClose"
	  :close-on-click-overlay="false"
	>
		<view class="pay-box flex-c">
			<view class="title">
				在线支付
			</view>
			<view class="all-pay-price">
				￥{{price}}
			</view>
			<view class="pay-mode flex">
				<van-icon name="alipay" color="rgb(23,120,255)" size="50rpx"></van-icon>
				<view class="pay-item flex-a">
					<text>余额支付({{userCardStore.userBalance}})</text>
				</view>
			</view>
			<view class="pay">
				<van-button type="primary" @tap="confirmPay" block >确认支付</van-button>
			</view>
		</view>
	</van-popup>
</template>

<script setup>
import { computed } from 'vue'
import {updateUserMoneyAPI} from '../../api/user.js'
import {useUserCardStore} from '../../store/useUserCardStore.js'
import {updateOrderItemStatusAPI} from '../../api/order.js'
import {useOrderStore} from '../../store/useOrderStore.js'
const orderStore = useOrderStore()
const userCardStore = useUserCardStore()
const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	type: { //根据type辨别从什么地方拉起支付
		type: Boolean,
		default: false
	},
	price: [Number, String],
	id: {  //order_id
		type: Number,
		default: 0
	}
})
const emits = defineEmits(['update:show'])


const onClose = () => {
	emits('update:show', false)
	if(props.type) {
		//还可以添加loding
		uni.navigateTo({
			url: `/profilePackge/OrderDetail/OrderDetail?id=${props.id}&to=2`
		})
	} else {
		//取消订单
		orderStore.onCancelOrderItem(props.id)
		uni.navigateTo({
			url: `/profilePackge/pay-result/pay-result?to=1`
		})
	}
}

//确认支付
const confirmPay = async () => {
	let to
	props.type ? to = 2 : to = 1
	await Promise.all([orderStore.updateItem(1,orderStore.orderItem.order_id, props.price),updateUserMoneyAPI(userCardStore.userBalance, 0, props.price)])
	emits('update:show', false)
	uni.navigateTo({
		url: `/profilePackge/pay-result/pay-result?to=${to}`
	})
}
</script>

<style lang="scss" scoped>
.pay-box {
	.title {
		line-height: 94rpx;
		margin-left: 30rpx;
		font-size: 20px;
		font-weight: 550;
	}
	.all-pay-price {
		margin: 40rpx auto;
		font-size: 18px;
	}
	.pay {
		width: 64vw;
		margin: 40rpx auto 0;
		border-radius: 20rpx;
		:deep(.van-button) {
			border-radius: 20rpx;
		}
	}
	.pay-mode {
		padding: 20rpx;
		background-color: #f1f1f1;
		.pay-item {
			margin-left: 12rpx;
			.error {
				color: #f72430;
				font-size: 11px;
				margin: 14rpx 0 0 12rpx;
			}
		}
	}
}
</style>
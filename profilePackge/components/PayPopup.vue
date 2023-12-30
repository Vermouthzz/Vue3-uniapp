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
					<text>余额支付({{userCardStore.userBalance.num}})</text>
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
	type: { 
		type: Boolean,
		default: false
	},
	price: {
		type: String,
		default: '0'
	},
	id: {
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
			url: `/profilePackge/OrderDetail/OrderDetail?id=${props.id}`
		})
	}
}

//确认支付
const confirmPay = async () => {
	// userCardStore.postNewBalance(userCardStore.userBalance.num - props.price)
	await Promise.all([updateOrderItemStatusAPI(1,orderStore.orderItem.order_id),updateUserMoneyAPI( userCardStore.userBalance.num, 0, props.price)])
	onClose()
	uni.navigateTo({
		url: `/profilePackge/pay-result/pay-result`
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
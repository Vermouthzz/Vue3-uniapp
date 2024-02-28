<template>
	<view class="fee-youhui-block">
		<view class="common-item flex-a goods-price">
			<view class="name-left">
				商品金额
			</view>
			<view class="number-right">
				￥{{createOrderStore.totalPrice}}
			</view>
		</view>
		<view class="common-item flex-a driver-fee">
			<view class="name-left">
				邮费
			</view>
			<view class="number-right">
				预估￥{{fee}}
			</view>
		</view>
		<view class="common-item flex-a driver-fee" v-show="userCardStore.selectedTicket">
			<view class="name-left">
				红包抵扣
			</view>
			<view class="number-right">
				-￥{{userCardStore.selectedTicket?.ticket_price}}
			</view>
		</view>
		<view class="common-item flex-a driver-fee" v-show="li_checked">
			<view class="name-left">
				礼品卡
			</view>
			<view class="number-right">
				-￥{{userCardStore.userCard[0].card_num}}
			</view>
		</view>
		<view class="common-item flex-a driver-fee" v-show="h_checked">
			<view class="name-left">
				提货卡
			</view>
			<view class="number-right">
				-￥{{userCardStore.userCard[1].card_num}}
			</view>
		</view>
		<view class="common-item flex-a active-youhui">
			<view class="name-left">
				活动优惠
			</view>
			<view class="number-right red-price">
				-￥{{createOrderStore.activeFee}}
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {useCartStore} from '../../../store/useCartStore.js'
import {useUserCardStore} from '../../../store/useUserCardStore.js'
import {useCreateOrderStore} from '../../../store/useCreateOrderStore.js'
const userCardStore = useUserCardStore()
const createOrderStore = useCreateOrderStore()
const cartStore = useCartStore()
const props = defineProps(['li_checked','h_checked'])

const fee = ref(0.00)
</script>

<style lang="scss">
	.fee-youhui-block {
		margin-top: 16rpx;
		padding: 24rpx 30rpx;
		font-size: 13px;
		background-color: #fff;
		.common-item {
			justify-content: space-between;
			.red-price {
				color: #bd7478;
			}
		}
		.driver-fee {
			margin: 24rpx 0;
		}
	}
</style>
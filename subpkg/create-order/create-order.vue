<template>
	<scroll-view scroll-y="true" class="scroll-order">
		<create-header></create-header>
		<block v-for="(item,index) in cartStore.selectedItems" :key="index">
			<packge-item :item="item" :index="index"></packge-item>
		</block>
		<!-- 优惠券、红包板块 -->
		<create-quote v-model:li_checked="li_checked" v-model:h_checked="h_checked"></create-quote>
		<!-- 商品金额信息板块 -->
		<Discount v-model:li_checked="li_checked" v-model:h_checked="h_checked"></Discount>
	</scroll-view>
	<view class="create-order-btm flex">
		<view class="pay-price">
			应付:￥{{payNum.toFixed(2)}}
		</view>
		<view class="buy-now" :style="{backgroundColor: addressStore.addressList ? '#f72430' : ''}" @tap="onPayFor">
			立即支付
		</view>
	</view>
	<pay-popup v-model:show="show" :type="true" :price="payNum.toFixed(2)"></pay-popup>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import { computed, ref, watchEffect } from 'vue'
import PayPopup from '../components/PayPopup.vue'
import PackgeItem from './components/PackgeItem.vue'
import Discount from './components/Discount.vue'
import CreateHeader from './components/CreateHeader.vue'
import CreateQuote from './components/CreateQuote.vue'
import {useCartStore} from '../../store/useCartStore.js'
import {useAddressStore} from '../../store/useAddressStore.js'
import {useUserCardStore} from '../../store/useUserCardStore.js'
import {useOrderStore} from '../../store/useOrderStore.js'
const orderStore = useOrderStore()
const addressStore = useAddressStore()
const cartStore = useCartStore()
const userCardStore = useUserCardStore()

//礼品卡、提货卡
const li_checked = ref(false)
const h_checked = ref(false)
//应付总金额
const payNum = computed(() => {
	let li_num = 0, h_num = 0
	if(li_checked.value) li_num = userCardStore.userCard[0].card_num
	if(h_checked.value) h_num = userCardStore.userCard[1].card_num
	if( userCardStore.selectedTicket) { //如果选中红包
		return cartStore.allRetailPrice - li_num - h_num - userCardStore.selectedTicket.ticket_price
	} else { //未选中红包
		return cartStore.allRetailPrice - li_num - h_num
	}
})
//展示支付popup
const show = ref(false)
const onPayFor = async () => {
	show.value = true
	uni.showLoading({ mask: true })
	let flag = orderStore.createOrderItem(cartStore.selectedItems,addressStore.selectedAddress,cartStore.activeFee,payNum.value)
	if(flag) uni.hideLoading()
}


</script>

<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #f4f4f4;
}
.scroll-order {
	flex: 1;
	overflow: scroll;
	
	
}

.create-order-btm {
	width: 100%;
	height: 100rpx;
	justify-content: space-between;
	background-color: #fff;
	font-size: 13px;
	.pay-price {
		padding: 30rpx 30rpx;
		color: #f72430;
	}
	.buy-now {
		padding: 30rpx 56rpx;
		color: #fff;
		background-color: #ccc;
	}
}

</style>
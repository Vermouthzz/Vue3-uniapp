<template>
	<scroll-view scroll-y="true" class="scroll-order">
		<create-header></create-header>
		<block v-for="(item,index) in createOrderStore.createOrderList" :key="index">
			<packge-item :item="item" :index="index"></packge-item>
		</block>
		<!-- 优惠券、红包板块 -->
		<create-quote :li_checked="userCard[0].checked" :h_checked="userCard[1].checked" v-model:ba_checked="ba_checked" @checkChange="onCheckChange"></create-quote>
		<!-- 商品金额信息板块 -->
		<Discount :li_checked="userCard[0].checked" :h_checked="userCard[1].checked"></Discount>
	</scroll-view>
	<view class="create-order-btm flex">
		<view class="pay-price">
			应付:￥{{payNum.toFixed(2)}}
		</view>
		<view class="buy-now" :style="{backgroundColor: addressStore.addressList && ba_checked ? '#f72430' : ''}" @tap="onPayFor">
			立即支付
		</view>
	</view>
	<PasswordPopup v-model:show="password_show" v-model:is_verify="is_verify"></PasswordPopup>
	<pay-popup v-model:show="show" :type="true" :price="payNum.toFixed(2)"></pay-popup>
	<van-dialog id="van-dialog" />
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {storeToRefs} from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import PayPopup from '../components/PayPopup.vue'
import Dialog from '../../wxcomponents/vant/dialog/dialog'
import PackgeItem from './components/PackgeItem.vue'
import Discount from './components/Discount.vue'
import CreateHeader from './components/CreateHeader.vue'
import CreateQuote from './components/CreateQuote.vue'
import {useCartStore} from '../../store/useCartStore.js'
import {useAddressStore} from '../../store/useAddressStore.js'
import {useUserCardStore} from '../../store/useUserCardStore.js'
import {useOrderStore} from '../../store/useOrderStore.js'
import {useUserStore} from '../../store/useUserStore.js'
import {useCreateOrderStore} from '../../store/useCreateOrderStore.js'
import {useTicketStore} from '../../store/useTicketStore.js'
import {getCreateOrderAPI} from '../../api/order.js'
const userStore = useUserStore()
const createOrderStore = useCreateOrderStore()
const ticketStore = useTicketStore()
const orderStore = useOrderStore()
const addressStore = useAddressStore()
const cartStore = useCartStore()
const userCardStore = useUserCardStore()
//礼品卡userCard[0]、提货卡userCard[1]
const { userCard } = storeToRefs(userCardStore)



//用户余额
const ba_checked = ref(false)

const onCheckChange = (val,type) => {
	userCardStore.onCheckedChange(val, type)
}
// 应付总金额
const payNum = computed(() => {
	let li_num = 0, h_num = 0
	//是否选中礼品卡和提货卡
	if(userCard.value[0].checked) li_num = userCard.value[0].card_num
	if(userCard.value[1].checked) h_num = userCard.value[1].card_num
	if( ticketStore.selectedTicket) { //如果选中红包
		return createOrderStore.totalRetailPrice - li_num - h_num - ticketStore.selectedTicket.ticket_price
	} else { //未选中红包
		return createOrderStore.totalRetailPrice - li_num - h_num
	}
})
const change = () => {
	
}
const is_verify = ref(false) //是否校验成功密码
const hasPayPassword = () => {
	if(!userStore.userInfo.has_payword) {  //没有设置支付密码
		if(li_checked.value) {
			//提示去设置支付密码
			return new Promise((resolve, reject) => {
				Dialog.confirm({
				  title: '使用礼品卡必须启用支付密码',
				  message: '弹窗内容',
				  confirmButtonText: '前往设置'
				})
				  .then(() => {
					console.log(111);
				  })
				  .catch(() => {
				    resolve(false)
				  });
			})
		}
	} else {  //设置了支付密码
		password_show.value = true
		return new Promise((resolve, reject) => {
			let timer = setInterval(() => {
				if(is_verify.value) {
					resolve(true)
					clearInterval(timer)
				}
			},500)
		})
	}
}
//展示支付popup
const show = ref(false)
const password_show = ref(false)
const onPayFor = async () => {
	if(userCardStore.userBalance < payNum.value) {
		return uni.showToast({
			icon: 'error',
			title: '余额不足，请充值'
		})
	}
	const res = await hasPayPassword()
	if(!res) return
	show.value = true
	uni.showLoading({ mask: true })
	const li_num = userCard.value[0].checked ? userCard.value[0].card_num : 0
	try{
		let user_ticketId = ticketStore.selectedTicket ? ticketStore.selectedTicket.user_ticket_id : 0
		const id = await createOrderStore.createOrderItem(addressStore.selectedAddress, user_ticketId, li_num)
		orderStore.getOrderItem(id)
		ticketStore.getTicketList()
		//创建订单完成后，删除购物车商品
		uni.hideLoading()
	}catch(e){
		uni.showToast({
			icon: 'error',
			title: '服务器错误，请稍后再试'
		})
	}
}

onLoad(() => {
	ticketStore.OptimalPrice(createOrderStore.totalRetailPrice, createOrderStore.serviceIds, 'select')
})
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
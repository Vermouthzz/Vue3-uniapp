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
	<PasswordPopup v-model:show="password_show" v-model:is_verify="is_verify"></PasswordPopup>
	<pay-popup v-model:show="show" :type="true" :price="payNum.toFixed(2)"></pay-popup>
	<van-dialog id="van-dialog" />
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import { computed, nextTick, ref, watchEffect } from 'vue'
import PayPopup from '../components/PayPopup.vue'
import Dialog from '../../wxcomponents/vant/dialog/dialog'
import PasswordPopup from '../../components/PasswordPopup/PasswordPopup.vue'
import PackgeItem from './components/PackgeItem.vue'
import Discount from './components/Discount.vue'
import CreateHeader from './components/CreateHeader.vue'
import CreateQuote from './components/CreateQuote.vue'
import {useCartStore} from '../../store/useCartStore.js'
import {useAddressStore} from '../../store/useAddressStore.js'
import {useUserCardStore} from '../../store/useUserCardStore.js'
import {useOrderStore} from '../../store/useOrderStore.js'
import {useUserStore} from '../../store/useUserStore.js'
const userStore = useUserStore()
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
	const res = await hasPayPassword()
	console.log(res);
	if(!res) return
	show.value = true
	// uni.showLoading({ mask: true })
	// let flag = orderStore.createOrderItem(cartStore.selectedItems,addressStore.selectedAddress,cartStore.activeFee,payNum.value)
	// if(flag) uni.hideLoading()
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
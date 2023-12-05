<template>
	<view class="cart-header fff" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<view class="title">
			购物车
		</view>
		<view class="location flex" @tap="onShowAddress">
			<van-icon name="location-o" size="24rpx" />
			<text class="address-text">{{addressStore.selectedAddress.address.split(' ').join('')}}</text>
			<van-icon name="arrow" size="24rpx" />
		</view>
	</view>
	<van-action-sheet :show="showAddress" title="配送至" @close="onShowAddress('close')" :round="false">
	  <scroll-view scroll-y="true" class="address-block" >
	  	<view class="address-item" v-for="item in addressStore.addressList" :key="item.addres_id">
	  		<van-checkbox @change="onChangeItem($event,item)" :value="item.is_selected">{{item.address.split(' ').join('')}}</van-checkbox>
	  	</view>
	  </scroll-view>
	</van-action-sheet>
</template>

<script setup>
import { ref } from 'vue'
import {useAddressStore} from '../../../store/useAddressStore.js'
const addressStore = useAddressStore()
const {safeAreaInsets} = uni.getSystemInfoSync()
const showAddress = ref(false)

const onChangeItem = (e,item) => {
	addressStore.onSelectedAddress(e.detail,item.addres_id)
}

const onShowAddress = (type = 'open') => {
	type == 'close' ? showAddress.value = false : showAddress.value = true
}

</script>

<style lang="scss" scoped>
.cart-header {
	padding-left: 20rpx;
	.title {
		padding: 28rpx 0;
	}
	.location {
		padding-bottom: 16rpx;
		.address-text {
			font-size: 11px;
		}
	}
}
.address-block {
	height: 40vh;
	padding-left: 20rpx;
	border-top: 1px solid #d7d7d7;
	.address-item {
		padding: 24rpx 0;
		border-bottom: 1px solid #d7d7d7;
	}
}
</style>
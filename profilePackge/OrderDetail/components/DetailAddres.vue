<template>
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
</template>

<script setup>
import {useAddressStore} from '../../../store/useAddressStore.js'
const addressStore = useAddressStore()
//地址
const address = computed(() => addressStore.selectedAddress.address.split(" ").join('') + addressStore.selectedAddress.detail_adrs)
const phone = computed(() => orderStore.orderItem.contact?.slice(0,3) + '****' + orderStore.orderItem.contact?.slice(7))
</script>

<style lang="scss" scoped>
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
</style>
<template>
	<view class="address-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'收货地址'"></CustomHeader>
		<view class="adress-body">
			<view v-for="item in addressStore.addressList" :key="item.addres_id" class="addres-item-block">
				<AddressItem :list="item"></AddressItem>
			</view>
		</view>
		<view class="footer flex" :style="{bottom: safeAreaInsets.bottom + 'px'}">
			<!-- #ifdef MP -->
			<view class="btn-comm btn-from">
				<van-icon name="wechat" color="#06bb07" size="36rpx" />
				<text>微信导入</text>
			</view>
			<!-- #endif -->
			<view class="btn-comm btn-add" @tap="toAdd">
				新增收货地址
			</view>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import AddressItem from './components/AddressItem.vue'
import {ref} from 'vue'
import {useAddressStore} from '../../store/useAddressStore.js'
// import {useUserStore} from '../../store/useUserStore.js'
const addressStore = useAddressStore()
// const userStore = useUserStore()
const {safeAreaInsets} = uni.getSystemInfoSync() //获取设备信息


const toAdd  = () => {
	uni.navigateTo({
		url: '/profilePackge/add-edit/add-edit?type=1'
	})
}

</script>

<style lang="scss">
page {
	height: 100%;
	overflow: hidden;
}
.address-block {
	height: 100%;
	.header-adress {
		overflow: hidden;
		.header-left {
			float: left;
			margin-left: 12rpx;
		}
		.header-adress-title {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.adress-body {
		padding: 0 20rpx;
		margin-top: 20rpx;
		.addres-item-block {
			margin-top: 36rpx;
		}
	}
	.footer {
		width: 100%;
		position: fixed;
		left: 0;
		justify-content: space-between;
		padding: 14rpx 20rpx;
		.btn-comm {
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			padding: 12rpx 90rpx;
			border-radius: 50rpx;
		}
		.btn-from {
			margin-right: 10rpx;
			color: black;
			border: 1px solid #d6d6d6;
		}
		.btn-add {
			background: linear-gradient(#f8311b,#fa5f1c);
			color: #fff;
	
		}
	}
}

</style>

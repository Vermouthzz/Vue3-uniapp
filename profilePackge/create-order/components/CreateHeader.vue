<template>
	<view class="create-order-header flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<Header :title="'填写订单'" :middle="true"></Header>
		<view class="header-split"></view>
		<view class="addres-block flex">
			<block v-if="!addressStore.addressList.length">
				<view class="ad-item-block flex-a">
					<view class="ad-item-left flex">
						<van-icon name="location" siez="60rpx" color="#ea6768"></van-icon>
						<text class="item-left-text">填写地址</text>
					</view>
					<van-icon name="arrow" siez="24rpx"></van-icon>
				</view>
				<view class="ad-item-block flex-a">
					<view class="ad-item-left flex">
						<van-icon name="wechat" siez="60rpx" color="#5dbe6f"></van-icon>
						<text class="item-left-text">导入微信地址</text>
					</view>
					<van-icon name="arrow" siez="24rpx"></van-icon>
				</view>
			</block>
			<block v-else>
				<view class="adress-item flex-a" @tap="toAddres">
					<view class="adress-item-left flex-c">
						<view class="item-left-top flex-a">
							<view class="small-view default" v-if="addressStore.showAddress.is_default == 1">
								默认
							</view>
							<view class="small-view">
								{{addressStore.showAddress.tag}}
							</view>
							<view class="adress-area">
								{{addressStore.showAddress.address}}
							</view>
						</view>
						<view class="item-left-adress">
							<text class="adress-detail">{{addressStore.showAddress.detail_adrs}}</text>
						</view>
						<view class="item-left-people flex-a">
							<text class="name">{{addressStore.showAddress.name}}</text>
							<text class="phone-number">{{addressStore.showAddress.contact}}</text>
						</view>
					</view>
					<view class="adress-item-right" >
						<van-icon name="arrow" size="32rpx" color="#bababa" />
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script setup>
import {computed, ref} from 'vue'
import Header from '../../../components/CustomHeader/CustomHeader.vue'
import AddressItem from '../../Address/components/AddressItem.vue'
import {useAddressStore} from '../../../store/useAddressStore.js'
const addressStore = useAddressStore()
const props = defineProps()
const {safeAreaInsets} = uni.getSystemInfoSync()



const toAddres = () => {
	uni.navigateTo({
		url: '/subpkg/Address/Address'
	})
}

</script>

<style lang="scss">
	.create-order-header {
		background-color: #fff;
		.header-top {
			padding-top: 24rpx;
			position: relative;
			padding-left: 20rpx;
			.title {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		.header-split {
			width: 100%;
			height: 12rpx;
			margin-top: 36rpx;
			background: url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-67880192dc.png?imageView&type=webp');
			background-size: 64rpx 12rpx;
		}
		.addres-block {
			padding: 16rpx 0;
			.ad-item-block {
				flex: 1;
				padding: 18rpx;
				justify-content: space-between;
				border-right: 1px solid #dadada;
				&:last-child {
					border: none;
				}
				.ad-item-left {
					.item-left-text {
						margin-left: 12rpx;
						font-size: 13px;
					}
				}
			}
			.adress-item {
				width: 100%;
				justify-content: space-between;
				padding: 20rpx 20rpx 6rpx;
				.adress-item-left {
					justify-content: space-between;
					.item-left-top {
						.small-view {
							padding: 2rpx 4rpx;
							margin-right: 12rpx;
							color: #fff;
							background-color: #4c83f3;
							border: 1px solid #4c83f3;
							border-radius: 6rpx;
							font-size: 10px;
						}
						.default {
							background-color: #f34804;
							border: 1px solid #f34804;
						}
						.adress-area {
							color: #8b8b8b;
							font-size: 12px;
						}
					}
					.item-left-adress {
						margin: 10rpx 0;
						.adress-detail {
							font-size: 16px;
							font-weight: 500;
							font-size: 14px;
						}
					}
					.item-left-people {
						font-size: 14px;
						color: #8b8b8b;
						.name {
							font-size: 12px;
							margin-right: 14rpx;
						}
					}
				}
				.adress-item-right {
					margin-left: 30rpx;
				}
			}
		}
	}
</style>
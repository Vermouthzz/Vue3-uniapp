<template>
	<view class="goods-footer flex">
		<view class="left-icons flex">
			<view class="icon flex-c-a" @tap="toTabPage('index/index')">
				<i class="iconfont icon-home"></i>
				<text class="icon-text">首页</text>
			</view>
			<view class="icon flex-c-a">
				<i class="iconfont icon-kefu"></i>
				<text class="icon-text">客服</text>
			</view>
			<view class="icon flex-c-a" @tap="toTabPage('cart/cart')">
				<i class="iconfont icon-cart1"></i>
				<text class="icon-text">购物车</text>
				<view class="cart-badge">
					
				</view>
			</view>
		</view>
		<view class="right-buy flex">
			<button class="add-cart common-btn" @tap="onShowPopup('add')">加入购物车</button>
			<button class="buy-goods common-btn" @tap="onShowPopup('buy')">立即购买</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {useCartStore} from '../../../store/useCartStore.js'
const porps = defineProps(['show'])
const emits = defineEmits(['update:show'])
const cartStore = useCartStore()
const {safeAreaInsets} = uni.getSystemInfoSync()

const toTabPage = (path) => {
	uni.switchTab({ url: `/pages/${path}` })
}

const isShow = ref(false)
const skuList = ref([])
const onShowPopup = (type) => {
	emits('update:show', true)
}
</script>

<style lang="scss">
	.goods-footer {
		justify-content: space-around;
		width: 100%;
		padding: 16rpx 16rpx 0;
		margin-top: 6rpx;
		box-sizing: border-box;
		background-color: #fff;
		.left-icons {
			.icon {
				margin-right: 30rpx;
				.iconfont {
					font-size: 44rpx;
				}
				.icon-home {
					 color: #ce4345;
				}
				.icon-text {
					font-size: 12px;
					color: #aaa;
				}
			}
		}
		.right-buy {
			.common-btn {
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				color: #fff;
				font-size: 14px;
				text-align: center;
				border-radius: 50rpx;
			}
		}
	}
</style>
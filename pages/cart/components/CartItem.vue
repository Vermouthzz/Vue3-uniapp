<template>
	<van-swipe-cell :right-width="65" async-close @close="onCloseSwipe">
		<view class="cart-item">
			<view class="cart-item-left">
				<van-checkbox :value="props.cartItem.selected" @change="onChangeCheck" checked-color="#f81e31"></van-checkbox>
				<image class="cart-item-img" :src="props.cartItem?.sku_item.pic"></image>
			</view>
			<view class="cart-item-pro">
				<view class="item-pro-top">
					<text class="_red">{{props.cartItem?.sku_item.service}}</text>{{props.cartItem?.sku_item.title}}
				</view>
				<view class="item-choose" @tap="openPopup">
					{{goodsSpec}}<van-icon class="arrow-down" name="arrow-down" size="20rpx" />
				</view>
				<view class="item-end">
					距优惠结束
					<view class="time">
						13:13:13
					</view>
				</view>
				<view class="item-price">
					<text class="small">￥</text>{{props.cartItem?.sku_item.price}}<text class="red-small">优惠后</text><text class="num-small">￥{{retailPrice}}</text>
				</view>
				<view class="item-add" v-if="props.cartItem.stepperFlag">
					<van-stepper :value="props.cartItem?.count" @change="changeValue" />
				</view>
				<view class="item-add-1" @tap="changeNumber" v-else>
					x{{props.cartItem?.count}}
				</view>
			</view>
		</view>
		<view slot="right" class="btn-del flex-a" @tap="onDelCartItem">删除</view>
	</van-swipe-cell>
	<GoodsPopop v-model:show="isShow" :goods="skuList"></GoodsPopop>
</template>

<script setup>
import { computed, ref } from 'vue'
import mitter from '../../../utils/mitt.js'
import GoodsPopup from '../../../components/GoodsPopop/GoodsPopop.vue'
import {useCartStore} from '../../../store/useCartStore.js'
import {useUserCardStore} from '../../../store/useUserCardStore.js'
import {getSkuListAPI} from '../../../api/goods.js'
const userCardStore = useUserCardStore()
const cartStore = useCartStore()

const props = defineProps()
const goods_num = ref(1)


const retailPrice = computed(() => {
	if(props.cartItem.selected) {
		return props.cartItem.sku_item.retail_price - cartStore.reNum
	}
	return props.cartItem.sku_item.retail_price
})

const skuList = ref([])
const isShow = ref(false)
const openPopup = async () => {
	const res = await getSkuListAPI(props.cartItem.goods_id)
	skuList.value = res.data
	Object.assign(skuList.value, {item_id: props.cartItem.item_id})
	isShow.value = true
}

const changeNumber = () => {
	cartStore.cartList.forEach(item => {
		item.stepperFlag = false
	})
	props.cartItem.stepperFlag = true
}
const goodsSpec = computed(() => {
	return props.cartItem?.spec.map(item => item.value).join(' ')
})

const onDelCartItem = async () => {
	cartStore.delCartItem(props.cartItem.item_id)
}
const onCloseSwipe = () => {
	
}
const changeValue = (e) => {
	props.cartItem.count = e.detail
	cartStore.updateCart(props.cartItem)
}
const onChangeCheck = (e) => {
	props.cartItem.selected = e.detail
	cartStore.updateCart(props.cartItem)
}
</script>


<style lang="scss" scoped>
	._red {
		color: #de2e43;
		margin-right: 4rpx;
	}
	.cart-item {
		position: relative;
		display: flex;
		margin-bottom: 40rpx;
		.cart-item-left {
			display: flex;
			align-items: center;
			margin-right: 16rpx;

			.cart-item-img {
				width: 200rpx;
				height: 200rpx;
				vertical-align: top;
			}
		}

		.cart-item-pro {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.item-pro-top {
				width: 80%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 14px;
			}

			.item-choose {
				width: fit-content;
				padding: 2rpx 6rpx;
				font-size: 10px;
				background-color: #f4f4f4;
				border-radius: 16rpx;
				.arrow-down {
					margin-left: 4rpx;
				}
			}

			.item-end {
				display: flex;
				width: 84%;
				font-size: 12px;
				color: #de2e43;
				padding: 6rpx 8rpx 6rpx 20rpx;
				border-radius: 24rpx;
				background: linear-gradient(#fcf2e4, #fdfdfa);

				.time {
					font-weight: 550;
				}
			}

			.item-price {
				font-size: 16px;

				.small {
					font-size: 10px;
				}

				.red-small {
					font-size: 10px;
					color: #fb2236;
				}

				.num-small {
					font-size: 12px;
					color: #fb2236;
					font-weight: 600;
				}

			}
			.item-add {
				position: absolute;
				right: 26rpx;
				bottom: 0rpx;
			}
			
			.item-add-1 {
				position: absolute;
				right: 26rpx;
				bottom: 0rpx;
				width: 8%;
				text-align: center;
				padding: 8rpx 2rpx;
				font-size: 12px;
				border-radius: 30rpx;
				border: 1px solid #ddd;
			}
		}
	}
</style>
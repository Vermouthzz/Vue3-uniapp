<template>
	<cart-header></cart-header>
	<scroll-view scroll-y="true" class="cart-block flex-c" @scrolltolower="onLoadMore">
		<view class="cart-body flex-c">
			<template v-if="!userStore.userInfo">
				<view class="not-login-block flex-c-a">
					<image class=".no-login-image" src="https://yanxuan.nosdn.127.net/3a6c77d8463d8675f4a0a0c80dbe4391.png"></image>
					<text>未登录</text>
					<view class="login-btn-block">
						<button class="login-btn" @tap="toLogin">去登录</button>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="scroll-cart">
					<view class="no-cart-item flex-c-a" v-if="!cartStore.cartList.length">
						<image class="no-cart-image" src="https://yanxuan.nosdn.127.net/3a6c77d8463d8675f4a0a0c80dbe4391.png" mode=""></image>
						<text class="no-cart-text">去添加点什么吧</text>
					</view>
					<view class="cart-list-block flex-c" v-else>
						<!-- 全场换购板块 -->
						<ChangeItem></ChangeItem>
						<!-- 购物车商品板块 -->
						<view class="cart-item-block" v-for="(item, index) in cartStore.cartList" :key="index">
							<view class="cart-block-title flex-a">
								<view class="title-left flex-a">
									<van-checkbox :value="item[0].value.every(i => i.selected)" @change="onChangeSection($event,item[0].value)" checked-color="#db1b2d"></van-checkbox>
									<text class="title-left-text">{{item[0].cart_fee}}</text>
								</view>
								<view class="cart-title-right">
									以下商品以免邮
								</view>
							</view>
							<block v-for="subItem in item[0].value" :key="subItem.item_id">
								<view>
									<CartItem :cartItem="subItem"></CartItem>
								</view>
							</block>
						</view>
					</view>
					<view class="love-block-cart">
						<LoveList :list="recommendList">
							<template #title>
								<view class="love-title">
									猜你喜欢
								</view>
							</template>
						</LoveList>
					</view>
				</view>
				<view class="end-pay">
					<van-submit-bar
					  :price="submitPrice * 100"
					  button-text="去结算"
					  @submit="onClickButton"
					>
					<van-checkbox :value="cartStore.allChecked" @change="onAllChange" checked-color="#db1b2d">全选</van-checkbox>
					</van-submit-bar>
				</view>
			</template>
		</view>
	</scroll-view>
</template>

<script setup>
import CartItem from './components/CartItem.vue'
import ChangeItem from './components/ChangeItem.vue'
import CartHeader from './components/CartHeader.vue'
import { ref,computed } from "vue"
import {useUserStore} from '../../store/useUserStore.js'
import {useCartStore} from '../../store/useCartStore.js'
import {useTicketStore} from '../../store/useTicketStore.js'
import { onLoad } from '@dcloudio/uni-app'
import {getRecommendListAPI} from '../../api/cart.js'
const userStore = useUserStore()
const cartStore = useCartStore()
const ticketStore = useTicketStore()


const top = ref(0)

const onChangeSection = (e,items) => {
	items.forEach(item => item.selected = e.detail)
	cartStore.updateCart(items)
}




const toLogin = () => {
	uni.redirectTo({
		url: '/indexpkg/login/login'
	})
}

//底部全选与取消全选功能
const onAllChange = (e) => {
	cartStore.onAllChange(e.detail)
}
//结算功能
const onClickButton = () => {
	if(!cartStore.selectedItems.length) return uni.showToast({title:'请选择商品结算', icon: 'error'})
	ticketStore.optimalTicket(cartStore.allRetailPrice,'selected')
	uni.navigateTo({
		url: '/profilePackge/create-order/create-order'
	})
}
//结算总金额
const submitPrice = computed(() => {
	return cartStore.allRetailPrice - ticketStore.optimalTicket(cartStore.allRetailPrice, 'price')
})

const recommendList = ref([])
const page = {
	pageNum: 1,
	pageSize: 10
}
const getRecommendList = async () => {
	const res = await getRecommendListAPI(page)
	if(res.result.length == 0) {
		return uni.showToast({
			icon: 'fail',
			title: '已经到底了'
		})
	}
	recommendList.value.push(...res.result)
}

const onLoadMore = () => {
	page.pageNum++
	getRecommendList()
}

onLoad(() => {
	getRecommendList()
})

</script>

<style lang="scss">
	page {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.cart-block {
		flex: 1;
		overflow: scroll;
		background-color: #eee;
		.cart-body {
			.not-login-block {
				justify-content: center;
				height: 100%;
				font-size: 12px;

				.no-login-image {
					width: 50%;
					height: 400rpx;
				}

				.login-btn-block {
					width: 96%;
					margin-top: 60rpx;

					.login-btn {
						padding: 14rpx 0;
						color: #fff;
						font-size: 12px;
						background-color: #cc9957;
					}
				}
			}

			.scroll-cart {
				height: calc(100% - 120rpx);
				padding-bottom: 60rpx;
				box-sizing: border-box;
				.no-cart-item {
					justify-content: center;
					height: 100%;

					.no-cart-image {
						width: 33%;
						height: 200rpx;
						margin-bottom: 10rpx;
					}

					.no-cart-text {
						font-size: 12px;
						color: #aaa;
					}
				}

				.cart-list-block {
					margin-bottom: 100rpx;
					padding: 16rpx 16rpx 0;

					//购物车商品
					.cart-item-block {
						border-radius: 16rpx;
						background-color: #fff;
						overflow: hidden;
						margin-top: 20rpx;
						padding: 20rpx 20rpx 40rpx 20rpx;
						box-sizing: border-box;

						.cart-block-title {
							justify-content: space-between;
							margin-bottom: 30rpx;
							.title-left {
								.title-left-text {
									font-weight: 600;
								}
							}
							.cart-title-right {
								font-size: 12px;
							}
						}
					}
				}
			}
			.end-pay {
				height: 120rpx;
				:deep(.van-submit-bar) {
					height: 50px;
				}
			}
		}
	}
</style>
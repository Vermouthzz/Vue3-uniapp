<template>
	<scroll-view scroll-y="true" @scroll="onMyScroll" class="profile-block flex-c" enable-flex>
		<profile-header :flag="isShow"></profile-header>
		<view class="profile-bd">
			<view class="profile-ticket-block flex">
				<view class="ticket-item flex-c-a" v-for="(i,index) in quoteList" :key="index" @tap="onTapQuoteList(i.path)">
					<view class="item-num" :class="{price: i.is_dollar}">
					{{i.num}}
					</view>
					<view class="item-name">
						{{i.name}}
					</view>
				</view>
			</view>
			<!-- 订单付款栏 -->
			<view class="order-card fff">
				<view class="order-block flex">
					<view class="order-item flex-c-a"  v-for="(item,index) in orderList" :key="index" @tap="toOrder(item,index)"> 
						<view class="order-item-icon">
							<i class="iconfont" :class="[`icon-${item.icon}`]"></i>
						</view>
						<view class="order-item-text">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<!-- 我的服务栏 -->
			<view style="margin-top: 15px;" class="fuwu-card flex-c card">
					<view class="fuwu-title">
						我的服务
					</view>
					<view class="fuwu-block flex">
						<view class="fuwu-item flex-c-a" @tap="toPages(item.path)" v-for="(item, index) in serviceList" :key="item.icon">
							<i class="iconfont" :class="[`icon-${item.icon}`]"></i>
							<view class="fuwu-item-text">
								{{item.name}}
							</view>
						</view>
					</view>
			</view>
			<!-- 新品首发板块 -->
			<view class="new-product card">
				<view class="new-block flex">
					<view class="new-block-item flex-c-a" v-for="j in 5" :key="j">
						<view class="new-item-img">
							<image class="new-item-image" src="https://yanxuan.nosdn.127.net/static-union/16644541382b06e4.png"></image>
						</view>
						<view class="new-item-text">
							新品首发
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢板块 -->
		<LoveList>
			<template #title>
				<view class="love-title">
					猜你喜欢
				</view>
			</template>
		</LoveList>
	</scroll-view>
</template>

<script setup>
import { ref } from "vue";
import LoveList from '../../components/LoveList/LoveList.vue'
import { useUserStore } from "../../store/useUserStore";
import ProfileHeader from './components/ProfileHeader.vue'
import { onLoad } from '@dcloudio/uni-app'
import {useProfileHook} from './profile.js'
const {quoteList,orderList, serviceList} = useProfileHook()
const userStore = useUserStore()
const isShow = ref(false)
const onMyScroll = (e) => {
	e.detail.scrollTop > 200 ? isShow.value = true : isShow.value = false
}

const verifyUserLogin = () => {
	//判断用户是否登录
	if(!userStore.userInfo) {
		//未登录
		uni.showToast({
			icon: 'error',
			title: '请先登录后再操作'
		})
		setTimeout(() => {
			uni.navigateTo({
				url: `/indexpkg/login/login`
			})
		}, 400)
		return false
	}
	return true
}

const toOrder = (item,index) => {
	if(!verifyUserLogin()) return
	uni.navigateTo({
		url: `/profilePackge/order/order?index=${index}&type=${item.type}`
	})
}

const toPages = (val) => {
	if(!verifyUserLogin()) return
	uni.navigateTo({
		url: val
	})
}
const onTapQuoteList = (path) => {
	if(!verifyUserLogin()) return
	uni.navigateTo({
		url: path
	})
}

onLoad(() => {
	
})
</script>

<style lang="scss">
page {
	height: 100vh;
	background-color: #f9f9f9;
}
.profile-block {
	height: 100vh;
	.profile-bd {
		padding: 0 16rpx;
		.profile-ticket-block {
			margin: 40rpx 0;
			font-size: 24rpx;
			.ticket-item {
				position: relative;
				flex: 1;
				margin: 0 14rpx;
				.item-num {
					position: relative;
					margin-bottom: 4rpx;
					&.price::before {
						content: '￥';
						display: block;
						position: absolute;
						top: -2rpx;
						left: -24rpx;
					}
				}
			}
			.ticket-item:first-child {
				margin-left: 0;
			}
			.ticket-item:last-child {
				margin-right: 0;
			}
		}
		.order-card {
			padding: 24rpx 16rpx 36rpx;
			border: 1px solid #fff;
			border-radius: 12rpx;
			box-shadow: 0 0 6rpx 1rpx rgba(0, 0, 0,0.08);
			.order-block {
				margin: 0 -30rpx;
				.order-item {
					position: relative;
					width: 20%;
					margin-top: 12rpx;
					margin-bottom: -16rpx;
					.iconfont {
						font-size: 50rpx;
					}
					.order-item-text {
						margin-top: 8rpx;
						font-size: 24rpx;
						color: #4a4a4a;
					}
					&:first-child::after {
						position: absolute;
						right: -4rpx;
						content: '';
						display: block;
						width: 4rpx;
						height: 92%;
						background-color: #d9d9d9;
						
					}
				}
				
			}
		}
		.card {
			border-radius: 16rpx;
			background-color: #fff;
			box-shadow: 0 0 6rpx 2rpx rgba(0, 0, 0,0.08);
		}
		.fuwu-card {
			padding: 30rpx 12rpx;
			.fuwu-title {
				font-size: 32rpx;
				font-weight: 550;
				margin: 0 0 10rpx 12rpx;
			}
			.fuwu-block {
				flex-wrap: wrap;
				.fuwu-item {
					width: 18%;
					margin: 20rpx 8rpx 10rpx 8rpx;
					&:nth-child(5n+1) {
						margin-left: 0;
					}
					&:nth-child(5n) {
						margin-right: 0;
					}
					.fuwu-item-text {
						margin-top: 10rpx;
						font-size: 22rpx;
						color: #4a4a4a;
					}
					.iconfont {
						font-size: 42rpx;
						color: #f98a68;
					}
				}
			}
		}
		.new-product {
			margin-top: 24rpx;
			.new-block {
				padding: 4rpx 20rpx 32rpx 12rpx;
				.new-block-item {
					flex: 1;
					.new-item-img {
						.new-item-image {
							width: 120rpx;
							height: 102rpx;
						}
					}
					.new-item-text {
						font-size: 24rpx;
					}
				}
			}
		}
		.love-title {
			font-size: 48rpx;
		}
	}
	
}
</style>

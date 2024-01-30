<template>
	<view class="card-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<Header :title="title + '-网易严选'" :middle="false"></Header>
		<view class="card-tab flex-c">
			<view class="tabs flex">
				<view class="tabs-item" @tap="onTap(item.card_sign)" v-for="item in userCardStore.userCard" :key="item.card_sign">				
					<text class="item" :class="{ active_border: sign == item.card_sign }">{{item.card_name}}</text>
				</view>
				<!-- <view class="tabs-item" @tap="onTap(1)">
					<text class="item" :class="{ active_border: !flag }">提货卡</text>
				</view> -->
			</view>
			<view class="tab-content">
				<view class="card-total flex-c-a" :style="{backgroundColor: sign == 1 ? '#a92d2b' : '#ad782d'}">
					<view class="total-top flex">
						<view class="total-title">
							{{title}}余额
						</view>
						<view class="total-right" @tap="toDetail">
							交易记录<van-icon name="arrow" size="24rpx"></van-icon>
						</view>
					</view>
					<view class="total-mid">
						￥<text class="mid-price">{{money}}</text>
					</view>
					<view class="total-btm">
						<view class="safety">
							支付安全
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" class="electron-card flex-c" v-for="item in userCardStore.userCard" v-show="sign == item.card_sign" :key="item.card_sign">
					<template v-if="item.children">
						<block v-for="subItem in item.children" :key="subItem.change_id">
							<view class="electrion-item fff flex-c">
								<view class="item-top flex">
									<text class="item-left">电子卡</text>
									<text class="item-right">余额￥{{subItem.change_num}}</text>
								</view>
								<view class="item-btm flex">
									<text class="item-left">{{subItem.show_id}}</text>
									<text class="item-right">有效期至 {{subItem.effective_time}}</text>
								</view>
							</view>
						</block>
					</template>
				</scroll-view>
			</view>
		</view>
		<view class="add-card-btm" :style="{marginBottom: safeAreaInsets.bottom + 'px'}">
			<view class="add-card-block">
				<text>+</text>
				<text>添加{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
import Header from './header.vue'
import {useUserCardStore} from '../../store/useUserCardStore.js'
const userCardStore = useUserCardStore()
const {safeAreaInsets} = uni.getSystemInfoSync()

const sign = ref(1)
const title = computed(() => sign.value == 1 ? '礼品卡':'提货卡')
const money = computed(() => sign.value == 1 ? userCardStore.userCard[0]?.card_num : userCardStore.userCard[1]?.card_num)

//切换提货卡和礼品卡
const onTap = (val) => {
	sign.value = val
}

const toDetail = () => {
	uni.navigateTo({
		url: '/profilePackge/balance-detail/balance-detail'
	})
}
</script>

<style lang="scss">
page {
	height: 100vh;
	display: flex;
	flex-direction: column;
}
.card-block {
	height: 100vh;
	.card-tab {
		flex: 1;
		.tabs {
			background-color: #fafafa;
			padding: 22rpx 0;
			.tabs-item {
				flex: 1;
				text-align: center;
				.item {
					padding: 10rpx 16rpx;
					&.active_border {
						border-bottom: 2px solid #d81e26;
					}
				}
			}
		}
		.tab-content {
			flex: 1;
			.card-total {
				color: #fff;
				font-size: 13px;
				.total-top {
					margin-top: 24rpx;
					.total-right {
						position: absolute;
						right: 20rpx;
					}
				}
				.total-mid {
					margin: 12rpx 0 36rpx;
					font-size: 24px;
					font-weight: 500;
					.mid-price {
						margin-left: -8rpx;
					}
				}
				.total-btm {
					margin-bottom: 24rpx;
					.safety {
						padding: 6rpx 8rpx;
						border: 1px solid #fff;
						border-radius: 8rpx;
					}
				}
			}
			.electron-card {
				height: calc(100% - 244rpx);
				box-sizing: border-box;
				background-color: #efefef;
				.electrion-item {
					padding: 24rpx 20rpx 30rpx;
					margin: 0 20rpx;
					margin-top: 20rpx;
					border: 1px solid #d9d9d9;
					.item-top {
						justify-content: space-between;
						padding: 0 4rpx;
						margin-bottom: 24rpx;
						font-size: 13px
					}
					.item-btm {
						justify-content: space-between;
						font-size: 12px;
						color: #777;
					}
				}
			}
		}
	}
	.add-card-btm {
		padding: 20rpx;
		.add-card-block {
			line-height: 80rpx;
			border: 1px solid #c1252b;
			border-radius: 6rpx;
			text-align: center;
			color: #c12625;
			font-size: 13px;
		}
	}
}


</style>

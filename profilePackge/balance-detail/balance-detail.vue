<template>
	<view class="ba-detail-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'网易严选-以严谨的态度...'"></CustomHeader>
		<view class="ba-detail-body">
			<view class="detail-item-block flex-c" v-for="(item,index) in cardList" :key="index">
				<view class="item-date">
					{{item.change_time}}
				</view>
				<view class="item-detail fff flex">
					<view class="item-left flex-c">
						<view class="item-card flex-a">
							<text class="name">卡号:</text>
							<text class="id">{{item.show_id}}</text>
						</view>
						<view class="item-order flex-a">
							<text class="name">订单:</text>
							<text class="id">{{item.order_id ? item.order_id : '--'}}</text>
						</view>
					</view>
					<view class="item-right flex">
						<view class="item-name">
							{{Name(item.change_type)}}
						</view>
						<view class="item-change flex-c">
							<text :class="[item.change_type == 0 ? 'dec' : 'add']">{{item.change_num.toFixed(2)}}</text>
							<text class="btm">{{item.change_type == 0 ? '0.00' : item.change_num.toFixed(2)}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {getCardDetailAPI} from '../../api/card.js'
const {safeAreaInsets} = uni.getSystemInfoSync()

const cardList = ref([])
const getCardList = async () => {
	const res = await getCardDetailAPI(1)
	cardList.value = res.data
}

const Name = (type) => {
	return type == -1 ? '退款余额' : type == 0 ? '消费余额' : '充值余额'
}

onMounted(() => {
	getCardList()
})
</script>

<style lang="scss">
.ba-detail-block {
	height: 100vh;
	box-sizing: border-box;
	.ba-detail-body {
		flex: 1;
		background-color: #efefef;
		.detail-item-block {
			font-size: 13px;
			.item-date {
				text-align: center;
				margin: 8rpx 0;
			}
			.item-detail {
				padding: 24rpx 36rpx;
				.item-left {
					flex: 2;
					color: #656565;
					.name {
						margin-right: 10rpx;
					}
					.item-card {
						margin-bottom: 10rpx;
					}
				}
				.item-right {
					flex: 1;
					justify-content: space-between;
					.item-name {
						width: 54rpx;
						line-height: 40rpx;
					}
					.item-change {
						position: relative;
						.add::before {
							position: absolute;
							content: '+';
							left: -18rpx;
							top: -2rpx;
							width: 18rpx;
							height: 18rpx;
						}
						.dec::before {
							position: absolute;
							content: '-';
							left: -12rpx;
							width: 20rpx;
							height: 20rpx;
						}
						.btm {
							margin-top: 10rpx;
						}
					}
				}
			}
		}
	}
}
</style>

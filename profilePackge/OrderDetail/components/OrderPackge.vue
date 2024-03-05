<template>
	<view class="pakge-block flex-c">
		<view class="pakge-top flex-a">
			<text class="pakge-name">包裹{{index + 1}}</text>
			<view class="order-status">
				待收货
			</view>
		</view>
		<view class="pakge-item flex">
			<image :src="item.pic" class="pakge-item-left"></image>
			<view class="pakge-item-right flex-c">
				<view class="item-name-service flex">
					<view class="item-text">
						<text class="item-name">{{item.goods_name}}</text>
					</view>
					<view class="item-count">
						x{{item.count}}
					</view>
				</view>
				<view class="item-guige">
					{{item.spec}}
				</view>
				<view class="item-price">
					<text class="real-price">￥{{item.price}}</text>
					<text class="discount-price">￥{{item.retail_price}}</text>
				</view>
			</view>
		</view>
		<view class="pakge-btm">
			
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(['item', 'index'])

const status = ['已取消','待付款','待发货','已发货','交易成功','交易成功']
const orderStatus = computed(() => status[props.item?.order_status * 1 + 1])
const statusColor = computed(() => props.item?.order_status == 3 ? '#4b9263' : '#dd2f50')

</script>

<style lang="scss" scoped>
	.pakge-block {
		padding-left: 16rpx;
		margin-top: 16rpx;
		background-color: #fff;
		box-sizing: border-box;
		.pakge-top {
			justify-content: space-between;
			padding: 20rpx 24rpx 20rpx 0;
			border-bottom: 1px solid #ebebeb;
			font-size: 26rpx;
			.pakge-name {
				margin-right: 16rpx;
			}
			.order-status {
				color: v-bind('statusColor');
			}
		}
		.pakge-item {
			padding: 16rpx 0;
			.pakge-item-left {
				flex-shrink: 0;
				width: 160rpx;
				height: 160rpx;
				margin-right: 16rpx;
			}
			.pakge-item-right {
				justify-content: space-evenly;
				font-size: 14px;
				.item-name-service {
					.item-text{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						//要显示的行数 2
						-webkit-line-clamp: 2;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.item-count {
						margin: 0 20rpx 0 80rpx;
					}
					
				}
				.item-guige {
					color: #818181;
					font-size: 11px;
				}
				.item-price {
					.real-price {
						color: #818181;
						text-decoration: line-through;
					}
				}
			}
		}
	}
</style>
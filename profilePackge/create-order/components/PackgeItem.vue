<template>
	<view class="pakge-block flex-c" v-for="subItem in props.item" :key="subItem.item_id">
		<view class="pakge-top flex-a">
			<text class="pakge-name">包裹{{props.index + 1}}</text>
			<slot name="title">
				<text class="pakge-time">支付后预计48小时内发货</text>
			</slot>
		</view>
		<view class="pakge-item flex">
			<image :src="subItem.sku_item.pic" class="pakge-item-left"></image>
			<view class="pakge-item-right flex-c">
				<view class="item-name-service flex">
					<view class="item-text">
						<text class="item-service">{{subItem.sku_item.service}}</text>
						<text class="item-name">{{subItem.sku_item.title}}</text>
					</view>
					<view class="item-count">
						x{{subItem.count}}
					</view>
				</view>
				<view class="item-guige">
					{{subItem.spec.map(i => i.value).join(' ')}}
				</view>
				<view class="item-price">
					<text class="real-price">￥{{subItem.sku_item.price}}</text>
					<text class="discount-price">￥{{subItem.sku_item.retail_price}}</text>
				</view>
			</view>
		</view>
		<view class="pakge-btm">
			
		</view>
	</view>
</template>

<script setup>
const props = defineProps()
</script>

<style lang="scss">
	.pakge-block {
		padding-left: 16rpx;
		margin-top: 16rpx;
		background-color: #fff;
		.pakge-top {
			padding: 20rpx 0;
			border-bottom: 1px solid #ebebeb;
			.pakge-name {
				margin-right: 16rpx;
			}
			.pakge-time {
				color: #c82320;
				font-size: 13px;
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
						.item-service {
							margin-right: 4rpx;
							color: #db9133;
						}
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
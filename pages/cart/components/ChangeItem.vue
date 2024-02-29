<template>
	<view class="change-block">
		<view class="change-top flex-a">
			<view class="title">
				全场换购
			</view>
			<div class="change-box flex">
				<view class="change">
					已满0.01元，可选择10间商品换购
				</view>
				<view class="get-change">
					去换购
					<van-icon name="arrow" size="24rpx"></van-icon>
				</view>
			</div>
		</view>
		<scroll-view scroll-x="true" class="scroll-change">
			<view class="change-item-block" v-for="i in 6" :key="i">
				<view class="change-item flex">
					<view class="item-left-img">
						<image
							src="https://yanxuan-item.nosdn.127.net/0ff394ce91519769c5bbf28174a37f64.jpg?type=webp&imageView&quality=75&thumbnail=750x0" class="item-left-image">
						</image>
					</view>
					<view class="item-right-detail flex-c">
						<view class="item-title">
							江南特产,原味西湖藕粉便宜出售
						</view>
						<view class="item-pro">
							原味藕粉,20克*5袋
						</view>
						<view class="item-price">
							<text class="_red">换购价￥</text><text class="price-num">20.8</text><text
								class="price-line">￥28</text>
						</view>
						<view class="cart-icon flex-a">
							<!-- <van-icon name="shopping-cart-o" size="44rpx" color="#c43043"></van-icon> -->
							<i class="iconfont icon-cart"></i>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.change-block {
		width: 96%;
		border-radius: 16rpx;
		background-color: #fff;
		padding: 0 16rpx 60rpx;
	
		.change-top {
			justify-content: space-between;
			font-size: 12px;
			margin: 30rpx 0;
	
			.title {
				font-size: 16px;
				font-weight: 550;
			}
	
			.change-box {
				justify-content: space-between;
	
				.change {
					margin-right: 12rpx;
				}
	
				.get-change {
					color: #f46c83;
				}
			}
		}
	
		.scroll-change {
			white-space: nowrap;
			.change-item-block {
				width: 62%;
				display: inline-block;
				margin-right: 20rpx;
	
				.change-item {
					width: 100%;
					background-color: #f6f6f9;						
					.item-left-img {
						margin-right: 8rpx;
	
						.item-left-image {
							width: 120rpx;
							height: 120rpx;
							vertical-align: top;
	
						}
					}
	
					.item-right-detail {
						position: relative;
						width: 70%;
						justify-content: space-between;
						font-size: 12px;
						padding: 0 6rpx 8rpx 0;
						box-sizing: border-box;
	
						.item-title {
							width: 100%;
							text-overflow: ellipsis;
							overflow: hidden;
							word-break: break-all;
							white-space: nowrap;
							font-size: 14px
						}
	
						.item-pro {
							color: #9e9e9e;
						}
	
						.item-price {
							._red {
								color: #cf3a4d;
							}
	
							.price-num {
								font-size: 18px;
								color: #fb2236;
							}
	
							.price-line {
								text-decoration: line-through;
								color: #9e9e9e;
							}
						}
	
						.cart-icon {
							position: absolute;
							justify-content: center;
							right: 6rpx;
							bottom: 6rpx;
							width: 50rpx;
							height: 50rpx;
							padding-right: 2rpx;
							border-radius: 50%;
							border: 1px solid #c43043;
						}
					}
				}
			}
		}
	
	}
</style>
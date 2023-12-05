<template>
	<view class="about-hot-block">
		<view class="about-hot-title flex">
			<view class="common-title active-title">
				相关商品
			</view>
			<view class="hot-title common-title">
				24小时热销
			</view>
		</view>
		<view class="about-hot-goods">
			<swiper class="about-hot-swiper" indicator-dots="true">
				<swiper-item class="item-hot-about flex">
					<view class="item-goods-block flex-c" v-for="i in 6" :key="i">
						<image class="item-goods-image" src="https://yanxuan-item.nosdn.127.net/a3f680a3e734fbd783c8b4148359238f.jpg?type=webp&imageView&quality=65&thumbnail=330x330"></image>
					<view class="item-detail-text">
						澳洲DIAA金奖认证，全脂罐装 800g
					</view>
					<view class="item-detail-price">
						<text class="r-price">￥69</text>
						<text class="f-price">￥129</text>
					</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss">
	.about-hot-block {
		margin-top: 12rpx;
		background-color: #fff;
		.about-hot-title {
			position: relative;
			border-bottom: 1px solid #9b9b9b;
			.common-title {
				flex: 1;
				display: flex;
				justify-content: center;
				padding: 24rpx 0;
				color: #818181;
				font-size: 15px;
				&.active-title {
					color: #dd1a21;
					&::after {
						position: absolute;
						bottom: 0;
						content: '';
						height: 1px;
						width: 70rpx;
						background-color: #dd1a21;
					}
				}
			}
		}
		.about-hot-goods {
			padding: 20rpx 20rpx 0;
			background-color: #fff;
			.about-hot-swiper {
				height: 810rpx;
				.item-hot-about {
					flex-wrap: wrap;
					.item-goods-block {
						width: 32%;
						height: 360rpx;
						margin-right: 12rpx;
						&:nth-child(3n) {
							margin: 0;
						}
						.item-goods-image {
							width: 100%;
							height: 240rpx;
						}
						.item-detail-text {
							font-size: 12px;
						}
						.item-detail-price {
							.r-price {
								font-size: 14px;
								font-weight: 550;
								color: #c7232f;
							}
							.f-price {
								font-size: 12px;
								text-decoration: line-through;
								color: #9b9b9b;
							}
						}
					}
				}
			}
		}
	}
</style>
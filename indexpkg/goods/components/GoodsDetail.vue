<template>
	<!-- 商品图片板块 -->
	<view class="goods-detail-img">
		<swiper class="goods-detail-swiper" @change="onSwiperChange">
			<swiper-item class="detail-swiper-item" v-for="(item,index) in goods.goods_albums" :key="item">
				<image class="detail-swiper-image" mode="heightFix" :src="item" @tap="onTapImg(item,index)"></image>
			</swiper-item>
		</swiper>
		<view class="swiper-dot flex">
			<text>{{current}}</text>
			<text>/</text>
			<text>{{goods.goods_albums?.length}}</text>
		</view>
	</view>
	<view class="goods-price-text flex-c">
		<view class="cheap-price">
			<text>特价</text>
			<text>距结束</text>
			<!--<text class="date">{{curHours}}</text>
			<text>:</text>
			<text class="date">{{curMinutes}}</text>
			<text>:</text>
			<text class="date">{{curSeconds}}</text> -->
		</view>
		<view class="goods-price">
			<text class="mid-size">￥</text><text class="big-size">{{goods.retail_price}}</text><text class="mid-size">.00</text>
			<text class="line-size">￥{{goods.goods_price}}</text>
		</view>
	</view>
	<!-- 商品介绍板块 -->
	<view class="goods-produce fff flex-c">
		<!-- 如果是新人则显示,领取后变为老用户 -->
		<!-- <view class="goods-ticket flex-a" v-show="true">  
			<view class="redPacket flex-a">
				红包
				<view class="whiteP">
					新人红包<text>满99减30元</text>
				</view>
			</view>
			<view class="get flex-a">
				领取
			</view>
		</view> -->
		<view class="goods-name">
			{{goods.goods_name}}
		</view>
		<view class="goods-recommend-block flex-a">
			<view class="goods-recommend-item1">
				自营
			</view>
			<view class="goods-recommend-item2 flex-a">
				<view class="bg-img">
					<image class="bg-image" src="https://yanxuan-item.nosdn.127.net/953fd27555b9382e9d3d656a54398953.png"></image>
				</view>
				<text class="item2-text">网易严选</text>
			</view>
		</view>
		<!-- 推荐理由板块 -->
		<view class="goods-bot-block flex-a">
			<view class="goods-bot-text">
				推荐理由
			</view>
			<view class="goods-bot-hot">
				销量<text class="goods-hot-text">10万+</text>
			</view>
		</view>
		<view class="goods-hot-list flex-c">
			<view class="hot-list-item flex-a" v-for="(item,index) in goods.goods_desc" :key="index">
				<view class="item-num flex-a">
					{{index + 1}}
				</view>
				<view class="item-text">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {computed, ref} from 'vue'
import {onLoad} from '@dcloudio/uni-app'
const props = defineProps({
	goods: {
		type: Object,
		default: {}
	}
})

//图片轮播
const current = ref(1)
const onSwiperChange = (e) => {
	current.value = e.detail.current + 1
}
const onTapImg = (item,index) => {
	uni.previewImage({
		urls: props.goods.goods_albums,
		current: index,
		loop:true,
		count: item
	})
}
onLoad(() => {
})
</script>

<style lang="scss">
	.goods-detail-img {
		position: relative;

		.goods-detail-swiper {
			height: 750rpx;

			.detail-swiper-item {
				.detail-swiper-image {
					height: 750rpx;
				}
			}
		}

		.swiper-dot {
			position: absolute;
			bottom: 40rpx;
			right: 40rpx;
			padding: 2rpx 6rpx;
			background-color: #fff;
			font-size: 12px;
		}
	}

	.goods-price-text {
		justify-content: space-around;
		background-color: #f91c35;
		border-bottom: 2rpx solid #a3464c;
		height: 140rpx;
		color: #fff;
		font-size: 14px;
		padding: 0 20rpx;

		.cheap-price {}

		.goods-price {
			.mid-size {
				margin-right: -8rpx;
				font-size: 18px;
			}

			.big-size {
				font-size: 24px;
			}

			.line-size {
				margin-left: 12rpx;
				text-decoration: line-through;
			}
		}
	}

	.goods-produce {
		padding: 0 20rpx;

		.goods-ticket {
			justify-content: space-between;
			margin: 20rpx 0;

			.redPacket {
				font-size: 12px;
				color: #fff;
				padding: 5rpx 5rpx 5rpx 8rpx;
				background-color: #f91f30;

				.whiteP {
					background-color: #fff;
					color: #d0274d;
					margin-left: 6rpx;
					padding: 6rpx;
				}
			}

			.get {
				width: 60rpx;
				justify-content: center;
				padding: 8rpx;
				color: #fff;
				font-size: 12px;
				border-radius: 26rpx;
				background-color: black;
			}
		}

		.goods-name {
			font-size: 16px;
		}

		.goods-recommend-block {
			margin: 12rpx 0;

			.goods-recommend-item1 {
				width: 12%;
				border-radius: 20rpx;
				color: #fff;
				font-size: 12px;
				text-align: center;
				padding: 4rpx 0;
				margin-right: 8rpx;
				background-color: #f94c4c;
			}

			.goods-recommend-item2 {
				.bg-img {
					margin-right: 6rpx;

					.bg-image {
						width: 36rpx;
						height: 36rpx;
						vertical-align: bottom;
					}
				}

				.item2-text {
					font-size: 12px;
					color: #aaa;
				}
			}
		}

		.goods-bot-block {
			justify-content: space-between;
			font-size: 13px;

			.goods-bot-text {}

			.goods-bot-hot {
				color: #aaa;

				.goods-hot-text {
					color: #c22527;
				}
			}
		}

		.goods-hot-list {
			position: relative;
			padding: 10rpx;
			margin-top: 20rpx;
			background-color: #fafafa;

			&::before {
				content: '>';
				position: absolute;
				top: -30rpx;
				left: 26rpx;
				display: block;
				color: #ccc;
				transform: rotate(-90deg);
			}

			.hot-list-item {
				margin-bottom: 10rpx;

				.item-num {
					justify-content: center;
					width: 30rpx;
					height: 30rpx;
					font-size: 12px;
					color: #b82332;
					border-radius: 50%;
					border: 2px solid #b82332;
					margin-right: 6rpx;
				}

				.item-text {
					font-size: 12px;
				}
			}
		}
	}
</style>
<template>
	<view class="block-top flex">
		<view class="top-left">
			<swiper class="swiper-a" @change="swiperChange" duration="3" autoplay="true">
				<swiper-item class="swiper-item-a" v-for="(item,index) in imgs" :key="item.id">
					<image class="swipet-item-img" :src="item.img" @tap="onClickImg(item,index)"></image>
				</swiper-item>
			</swiper>
			<view class="dot">
				<text>{{current}}</text>
				<text>/</text>
				<text>{{imgs?.length}}</text>
			</view>
		</view>
		<view class="top-right flex-c">
			<view class="everyday">
				<view class="title">
					<text class="title-text">每日抄底</text>
				</view>
			</view>
			<view class="new-goods">
				<view class="title flex-a">
					<text class="title-text">新品首发</text>
					<view class="new-every">
						每日上新
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'
const props = defineProps(['list','imgs'])

const current = ref(1)
//轮播图current改变时调用此函数
const swiperChange = (e) => {
	current.value = e.detail.current + 1
}

const onClickImg = (item, index) => {
	uni.previewImage({
		urls: props.imgs?.map(item => item.img),
		count: item.img_url,
		current: index
	})
}
</script>

<style lang="scss" scoped>
	.block-top {
		.top-left {
			position: relative;
			width: 50%;
			margin-right: 20rpx;

			.swiper-a {
				height: 524rpx;
				width: 344rpx;

				.swiper-item-a {
					.swipet-item-img {
						width: 100%;
						height: 100%;
						border-radius: 24rpx;
					}
				}
			}

			.dot {
				position: absolute;
				right: 20rpx;
				bottom: 16rpx;
				width: 70rpx;
				border-radius: 5px;
				background-color: #111d3c;
				text-align: center;
				opacity: 0.5;
				font-size: 12px;
				color: #fff;
			}
		}

		.top-right {
			width: 50%;
			height: 524rpx;

			.everyday {
				width: 100%;
				height: 49%;
				margin-bottom: 20rpx;
				border-radius: 12px;
				background-color: #ffe6e4;

				.date {
					display: inline-block;
					width: 40rpx;
					height: 40rpx;
					margin: 4rpx 6rpx 0 6rpx;
					line-height: 40rpx;
					border-radius: 50%;
					text-align: center;
					background-color: #343334;
					color: #fff;
					font-size: 12px;
				}
			}

			.new-goods {
				width: 100%;
				height: 49%;
				border-radius: 12px;
				background-color: #feeddc;

				.new-every {
					width: 120rpx;
					height: 32rpx;
					line-height: 32rpx;
					border-radius: 5px;
					color: #fff;
					font-size: 12px;
					margin-top: 4rpx;
					padding: 4rpx 0;
					background-color: #f3a649;
					text-align: center;
				}
			}
		}

		.title {
			padding: 30rpx 18rpx;

			.title-text {
				font-weight: 700;
				margin-right: 8rpx;
			}
		}
	}
</style>
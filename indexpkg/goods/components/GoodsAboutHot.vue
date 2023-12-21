<template>
	<view class="about-hot-block">
		<view class="about-hot-title flex">
			<view class="common-title" @tap="onTapTitle(index)" v-for="(item,index) in titleList" :class="{active_title: index == activeTitle}" :key="index">
				相关商品
			</view>
		</view>
		<view class="about-hot-goods">
			<swiper class="about-hot-swiper" @change="onSwiperChange" :current="currentItem">
				<block v-if="aboutList?.length">
					<swiper-item class="item-hot-about flex" v-for="(item,index) in aboutList.concat(hotList)" :key="index">
						<view class="item-goods-block flex-c" v-for="subItem in item" :key="subItem.goods_id">
							<image class="item-goods-image" :src="subItem.goods_img"></image>
							<view class="item-detail-text">
								{{subItem.goods_name}}
							</view>
							<view class="item-detail-price">
								<text class="r-price">{{subItem.retail_price}}</text>
								<text class="f-price">{{subItem.goods_price}}</text>
							</view>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="swiper-dots">
			<ol class="circle">
				<li class="dot-item" :class="{active_dot: dotIndex == i - 1}" v-for="i in 4" :key="i"></li>
			</ol>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['aboutList','hotList'])
const titleList = ref([
	{ name: '相关商品' },
	{ name: '24小时热销' }
])
const dotIndex = ref(0)
const activeTitle = ref(0)

const onSwiperChange = (e) => {
	currentItem.value = e.detail.current  //记录当前swiper-item的index
	if(e.detail.current > props.aboutList.length - 1) {
		e.detail.current -= props.aboutList.length
		activeTitle.value = 1
	} else {
		activeTitle.value = 0
	}
	dotIndex.value = e.detail.current
}

const currentItem = ref(0) //当前swiper-item的index
const onTapTitle = (index) => {
	currentItem.value = index * props.aboutList.length //点击title跳转到相应的swiper-item下
}

</script>

<style lang="scss">
	.about-hot-block {
		position: relative;
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
				&.active_title {
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
			padding: 20rpx;
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
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							text-overflow: ellipsis;
							font-size: 12px;
						}
						.item-detail-price {
							margin-top: 8rpx;
							.r-price {
								font-size: 14px;
								font-weight: 550;
								color: #c7232f;
								&:before {
									content: '￥';
									margin-right: -6rpx;
								}
							}
							.f-price {
								margin-left: 8rpx;
								font-size: 11px;
								text-decoration: line-through;
								color: #9b9b9b;
								&:before {
									content: '￥';
									margin-right: -4rpx;
								}
							}
						}
					}
				}
			}
		}
		.swiper-dots {
			position: absolute;
			bottom: 14rpx;
			left: 50%;
			transform: translateX(-50%);
			.circle {
				.dot-item {
					width: 12rpx;
					height: 12rpx;
					float: left;
					margin-right: 8rpx;
					border-radius: 50%;
					background-color: #dadada;
					&:last-child {
						margin: 0;
					}
				}
				.active_dot {
					background-color: #e61521;
				}
			}
		}
	}
</style>
<template>
	<view class="goods-item-block flex-c" @tap="toGoodsDetail">
		<view class="top-img">
			<image class="top-image" :src="goodsItem.goods_img || 'https://yanxuan-item.nosdn.127.net/b61a592db6544fb87710bfa6b2a226f7.png?type=webp&imageView&quality=65&thumbnail=330x330'"></image>
		</view> 
		<view class="btm-text">
			<view class="produce">
				<!-- <slot name="img"></slot> -->
				<image class="produce-image" src="https://yanxuan.nosdn.127.net/static-union/16698631101bcf18.png"></image>
				{{goodsItem.goods_name}}
			</view>
			<view class="goods-rank">
				<text class="rank-text">休闲零食肉类零食热销榜第2名</text>
			</view>
			<view class="goods-price">
				<text class="retail-price" v-show="retailPrice != goodsItem.retail_price">到手<text class="yuan">￥</text></text>
				<text class="hot-price"><text class="int">{{retailPrice || goodsItem.retail_price}}</text></text>
				<text class="real-price">￥{{goodsItem.goods_price}}</text>
			</view>
		</view>
		<view class="service-body flex-a" v-if="goodsItem.service_id != 0 && finishTime">
			<view class="left-service">{{goodsItem.service_name}}</view>
			<view class="end-time">
				距离结束
			</view>
			<van-count-down :time="finishTime" :format="timeFormat" class="count-down">
			</van-count-down>
		</view>
	</view>
</template>

<script setup>
import {ref,computed} from 'vue'
import {useTicketStore} from '../../store/useTicketStore.js'
import {useUserStore} from '../../store/useUserStore.js'
const ticketStore = useTicketStore()
const userStore = useUserStore()
const props = defineProps({
	goodsItem: {
		type: Object,
		default: {}
	}
})


function calculateTime(end) {
	if(!end) return 0
	const now = new Date().getTime()
	const remainTime = end * 1 - now
	return remainTime
}
//格式化时间
const timeFormat = computed(() => {
	const hours = 1000 * 60 * 60
	if(finishTime.value < hours) {
		return 'mm分'
	} else if(hours <= finishTime.value && finishTime.value < hours * 24) {
		return 'HH时'
	} else if(hours * 24 <= finishTime.value && finishTime.value < hours * 24 * 31  ) {
		return 'DD天'
	}
})
//计算结束时间
const finishTime = computed(() => calculateTime(props.goodsItem.end_time))

const retailPrice = computed(() => {
	return props.goodsItem.retail_price - ticketStore.OptimalPrice(props.goodsItem.retail_price, [props.goodsItem.servicer_id])
})


const toGoodsDetail = () => {
	uni.navigateTo({
		url: `/indexpkg/goods/goods?id=${props.goodsItem.goods_id}`,
	})
}
</script>

<style lang="scss" scoped>
.count-down {
	--count-down-font-size: 22rpx;
	--count-down-text-color: #d2293f;
}
.goods-item-block {
	width: 100%;
	margin-bottom: 50rpx;
	.top-img {
		width: 100%;
		.top-image { 	
			display: block;
			width: 100%;
			height: 200px;
			border-radius: 10px;
		}
	}
	.btm-text {
		margin-top: 5px;
		.produce {
			font-size: 13px;
			color: #171717;
			.produce-image {
				width: 18px;
				height: 18px;
				vertical-align: top;
			}
		}
		.goods-rank {
			margin: 5px 0;
			color: #9d9d9d;
			font-size: 22rpx;
		}
		.goods-price {
			color: #fd1f33;
			.retail-price {
				font-size: 22rpx;
				.yuan {
					font-weight: 550;
					font-size: 18rpx;
				}
			}
			.hot-price {
				font-size: 20rpx;
				.int {
					font-size: 30rpx;
				}
			}
			.real-price {
				color: #9b9b9b;
				font-size: 22rpx;
				text-decoration: line-through;
			}
		}
	}
	.service-body {
		width: 100%;
		padding: 4rpx;
		margin-top: 16rpx;
		background-color: #fde9eb;
		border-radius: 24rpx;
		.left-service {
			padding: 8rpx 12rpx;
			color: #fff;
			font-size: 22rpx;
			background-color: #ff1e2d;
			border-radius: 24rpx;
		}
		.end-time {
			margin-left: 6rpx;
			font-size: 20rpx;
			color: #d2293f;
		}
	}
}
</style>
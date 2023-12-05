<template>
	<view class="goods-block flex-c" @tap="toGoodsDetail">
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
				<text class="retail-price" v-show="retailPrice != goodsItem.retail_price">到手￥</text>
				<text class="hot-price"><text class="int">{{retailPrice || goodsItem.retail_price}}</text></text>
				<text class="real-price">￥{{goodsItem.goods_price}}</text>
			</view>
		</view>
		<slot name="footer">
			
		</slot>
	</view>
</template>

<script setup>
import {ref,computed} from 'vue'
import {useUserCardStore} from '../../store/useUserCardStore.js'
import {useUserStore} from '../../store/useUserStore.js'
const userCardStore = useUserCardStore()
const userStore = useUserStore()
const props = defineProps({
	goodsItem: {
		type: Object,
		default: {}
	}
})


const retailPrice = computed(() => {
	return props.goodsItem.retail_price - userCardStore.optimalTicket(props.goodsItem.retail_price,'price')
})


const toGoodsDetail = () => {
	uni.navigateTo({
		url: `/indexpkg/goods/goods?id=${props.goodsItem.goods_id}`,
	})
}
</script>

<style lang="scss" scoped>
.goods-block {
	width: 100%;
	// margin: 20rpx 0 6rpx;
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
			.produce-image {
				width: 18px;
				height: 18px;
				vertical-align: top;
			}
		}
		.goods-rank {
			margin: 5px 0;
			color: #9d9d9d;
			font-size: 12px;
		}
		.goods-price {
			font-size: 12px;
			.retail-price {
				color: #fd1f33;
			}
			.hot-price {
				color: #fd1f33;
				font-size: 14px;
				.int {
					font-size: 16px;
				}
			}
			.real-price {
				color: #9b9b9b;
				text-decoration: line-through;
			}
		}
	}
}
</style>
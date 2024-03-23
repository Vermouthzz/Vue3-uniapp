<template>
	<view class="brand-box flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="brandInfo.brand_name"></CustomHeader>
		<view class="brand-block">
			<scroll-view scroll-y="true" class="brand-scroll flex-c" @scroll="onBrandScroll">
				<brand-desc :brandInfo="brandInfo"></brand-desc>
				<view class="brand-bd flex-c">
					<brand-tab :scrollTop="scrollTop" v-model:type="type"></brand-tab>
					<view class="brand-scroll flex">
						<view class="goods-item" v-for="item in brandGoodsList" :key="item.goods_id">
							<GoodsItem :goodsItem="item"></GoodsItem>
						</view>
					</view>
					<view class="btm-end flex-a">
						更多内容，敬请期待
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import { ref, watch } from 'vue';
import GoodsItem from '../../components/GoodsItem/GoodsItem.vue'
import BrandTab from './components/BrandTab.vue'
import BrandDesc from './components/BrandDesc.vue'
import {getBrandGoodsAPI} from '../../api/goods.js'
const {safeAreaInsets} = uni.getSystemInfoSync()
const scrollTop = ref(0)
const onBrandScroll = (e) => {
	scrollTop.value = e.detail.scrollTop
}


//brandTab栏切换逻辑
const type = ref(1)  //默认为综合排序
watch(type, (newVal, oldVal) => {
	switch(newVal) {
		case 1:   //综合排序
			brandGoodsList.value = brandGoodsList.value.sort((a,b) => a.sort - b.sort)
			break
		case 2:  //价格升序
			brandGoodsList.value = brandGoodsList.value.sort((a,b) => a.goods_price - b.goods_price)
			break
		case 3:  //价格降序
			brandGoodsList.value = brandGoodsList.value.sort((a,b) => b.goods_price - a.goods_price)
			break
		case 4:  //销量降序
			brandGoodsList.value = brandGoodsList.value.sort((a,b) => b.sale - a.sale)
	}
})

const brandInfo = ref({})
const brandGoodsList = ref([])
const getBrandGoodsList = async (id) => {
	const res = await getBrandGoodsAPI(id)
	brandInfo.value = res.data.brand_info
	brandGoodsList.value = res.data.brand_goods
}
onLoad((options) => {
	getBrandGoodsList(options.id)
})
</script>

<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.brand-box {
	height: 100vh;
	box-sizing: border-box;
	.brand-block {
		flex: 1;
		height: 100%;
		background-color: #efefef;
		.brand-scroll {
			height: 100%;
			.brand-bd {
				flex: 1;
				background-color: #fff;
				.brand-scroll {
					flex: 1;
					flex-wrap: wrap;
					padding: 16rpx;
					box-sizing: border-box;
					.goods-item {
						width: 48.5%;
						margin-right: 20rpx;
						margin-bottom: 40rpx;
						&:nth-child(2n) {
							margin-right: 0;
						}
					}
				}
			}
			.btm-end {
				justify-content: center;
				height: 84rpx;
				color: #999;
				font-size: 11px;
				background-color: rgb(238, 238, 238);
			}
		}
	}
}

</style>

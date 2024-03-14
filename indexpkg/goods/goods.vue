<template>
	<view class="goods-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px', paddingBottom: safeAreaInsets.bottom + 'px'}">
		<goods-header></goods-header>
		<view class="goods-body flex-c">
			<scroll-view scroll-y="true" class="goods-scroll" enable-flex="true">
				<view class="goods-detail-block flex-c">
					<!-- 商品详情板块 -->
					<GoodsDetail :goods="goodsVal"></GoodsDetail>
					<view class="fee-rank-deliver">
						<!-- 热销、邮费、配送板块 -->
						<GoodsHotfee></GoodsHotfee>
						<!-- 配送板块 -->
						<GoodsDeliver :id="goodsVal.goods_id" v-model:show="show"></GoodsDeliver>
					</view>
					<!-- 用户评论板块 -->
					<GoodsComment :id="goodsVal.goods_id" :item="goodsVal.commentInfo"></GoodsComment>
					<!-- 品牌信息板块 -->
					<GoodsBrand :brandInfo="goodsVal.brand_info"></GoodsBrand>
					<!-- 相关商品、热销榜板块 -->
					<goods-about-hot :aboutList="goodsVal.aboutGoods" :hotList="goodsVal.hotGoods" />
					<!-- 参数板块 -->
					<goods-argument :arguments="goodsVal.attrList" />
					<!-- 大图板块 -->
					<view class="goods-big-img" v-if="goodsVal.goods_argImg">
						<view v-for="item in goodsVal.goods_argImg" :key="item">
							<image class="goods-big-image" mode="widthFix" :src="item"></image>
						</view>
					</view>
					<!-- 更多推荐板块 -->
					<block v-if="goodsVal.recommendList?.length">
						<LoveList>
							<template #name="title">
								<view class="love-title">
									更多推荐
								</view>
							</template>
						</LoveList>
					</block>
				</view>
			</scroll-view>
		</view>
		<goods-footer v-model:show="show"></goods-footer>
		<GoodsPopop v-model:show="show" :goods="skuList" :isCart="false"></GoodsPopop>
	</view>
</template>

<script setup>
import {ref} from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import GoodsHeader from './components/GoodsHeader.vue'
import GoodsDetail from './components/GoodsDetail.vue'
import GoodsDeliver from './components/GoodsDeliver.vue'
import GoodsHotfee from './components/GoodsHotfee.vue'
import GoodsFooter from './components/GoodsFooter.vue'
import GoodsAboutHot from './components/GoodsAboutHot.vue'
import GoodsArgument from './components/GoodsArgument.vue'
import GoodsComment from './components/GoodsComment.vue'
import GoodsBrand from './components/GoodsBrand.vue'
import { getGoodsInfoAPI, getSkuListAPI } from '../../api/goods.js'
const {safeAreaInsets} = uni.getSystemInfoSync()
//获取goods数据
const goodsVal = ref({})
const getGoodsInfo = async (id) => {
	const res = await getGoodsInfoAPI(id)
	goodsVal.value = res.result
	getSkuList(goodsVal.value.goods_id)
}
const skuList = ref([])
const getSkuList = async (id) => {
	const res = await getSkuListAPI(id)
	skuList.value = res.data
}

const show = ref(false)

onLoad((options) => {
	const { id } = options
	getGoodsInfo(id)	
})
</script>

<style lang="scss">
	page {
		height: 100%;
		overflow: hidden;
	}

	.goods-block {
		height: 100%;
		box-sizing: border-box;
		.goods-body {
			flex: 1;
			overflow: scroll;
			background-color: #f4f4f4;

			.goods-scroll {
				height: 100%;

				.goods-detail-block {
					.fee-rank-deliver {}
					.goods-select-item {
						justify-content: space-between;
						padding: 30rpx 20rpx;
						font-size: 13px;
						.rank-left {
							position: relative;
							&::after {
								content: '';
								position: absolute;
								top: -2rpx;
								left: 0;
								display: block;
								width: 40rpx;
								height: 40rpx;
								background: url('../../static/rank.png') no-repeat;
								background-size: 20px;
							}
							.rank_name {
								margin-left: 44rpx;
							}
						}
						.item-left {
							.item-left-conmmon {
								margin-right: 30rpx;
								color: #9b9b9b;
							}
						}
					}
					.goods-big-img {
						padding: 20rpx 12rpx 0;
						background-color: #fff;

						.goods-big-image {
							width: 100%;
							display: block;
						}
					}
				}
			}
		}
	}
</style>
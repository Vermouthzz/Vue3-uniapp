<template>
	<view class="subcate-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<view class="subcate-header">
			<CustomHeader :title="title"></CustomHeader>
			<!-- 三级分类栏 -->
			<view class="submit-header-btm">
				<scroll-view class="scroll-x-block" scroll-x="true" :scroll-left="scrollX" scroll-with-animation="true">
					<view class="block" v-for="(item,index) in subcateNav" :key="item.id" @tap="onSwitchTab(item,index)">
						<view class="third-cate-title" :class="{border_btm: currentItem == index}">
							{{item.category_name}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 三级分类内容项 -->
		<swiper class="cate-swiper" :current="currentItem" @change="swiperChange">
			<swiper-item class="cate-swiper-item" v-for="(item,index) in subcateNav" :key="index">
				<view class="scroll-y-block flex-c">
					<block v-if="item.list.length">
						<view class="second-cate-block flex-c">
							<view class="second-cate-title flex-a">
								{{secondTitle}}
							</view>
							<!-- 三级分类item -->
							<view class="third-cate-block flex">
								<view class="third-cate-item" v-for="(subItem) in item.list" :key="item.goods_id">
									<GoodsItem :goodsItem="subItem"></GoodsItem>
								</view>
							</view>
						</view>
					</block>
					<view class="init" v-else></view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
import {onLoad, onReady} from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import GoodsItem from '../../components/GoodsItem/GoodsItem.vue'
import {getSubcateListAPI} from '../../api/cate.js'
const {safeAreaInsets} = uni.getSystemInfoSync()
const title = ref('标题')

//获取分类商品数据
const subcateList = ref([])
const subcateNav = ref([])
const secondTitle = ref('')
const getSubCateList = async (id, parent_id) => {
	const res = await getSubcateListAPI(id, parent_id)
	if(res.result.navList.length) {
		subcateNav.value = res.result.navList.map(item => {
			return {
				...item,
				list: []
			}
		})
	}
	const item = subcateNav.value.find(i => i.category_id == id)
	item.list = res.result.goodsData
	secondTitle.value = res.result.secondTitle
}
//控制nav滚动
const scrollX = ref(0)
const navScroll = (index) => {
	scrollX.value = 0
	cateItemWidth.value.slice(0, index).forEach(i => scrollX.value += i.width)
}
//当前的swiperitem
const currentItem = ref(0)
//切换tab事件
const goodsId = ref()
const onSwitchTab = (item,index) => {
	currentItem.value = index
	goodsId.value = item.category_id
	navScroll(index)
}

const swiperChange = (e) => {
	currentItem.value = e.detail.current
	const item = subcateNav.value[currentItem.value]
	navScroll(currentItem.value)
	getSubCateList(item.category_id, -1)
}

const cateItemWidth = ref([])
onReady(() => {
	const cateItem = uni.createSelectorQuery().selectAll('.block')
	cateItem.boundingClientRect(data => {
		cateItemWidth.value = data
	}).exec()
})

onLoad((options) => {
	currentItem.value = options.index
	goodsId.value = options.goods_id
	title.value = options.title
	getSubCateList(options.goods_id, options.parent_id)
})
</script>

<style lang="scss">
page {
	height: 100%;
}
.subcate-block {
	height: 100%;
	box-sizing: border-box;
	.subcate-header {
		width: 100%;
		.subcate-header-top {
			padding: 0 16rpx;
			.title {
				margin-left: 12rpx;
			}
		}
		.submit-header-btm {
			width: 100vw;
			height: 66rpx;
			margin-top: 16rpx;
			border-bottom: 1px solid #f4f4f4;
			.scroll-x-block {
				white-space: nowrap;
				.block {
					display: inline-block;
					padding: 0 20rpx;
					.third-cate-title {
						padding: 8rpx 8rpx 14rpx;
						&.border_btm {
							border-bottom: 1px solid #95332f;
						}
					}
				}
			}
		}
	}
	.cate-swiper {
		flex: 1;
		.cate-swiper-item {
			height: 100%;
			.scroll-y-block {
				height: 100%;
				overflow: scroll;
				.init {
					height: 100%;
					background-color: #f4f4f4;
				}
				.second-cate-title {
					justify-content: center;
					margin: 40rpx 0 30rpx;
				}
				.third-cate-block {
					flex-wrap: wrap;
					padding: 0 12rpx;
					.third-cate-item {
						width: 48%;
						margin-right: 26rpx;
						&:nth-child(2n) {
							margin: 0;
						}
					}
				}
			}
		}
	}
}
</style>

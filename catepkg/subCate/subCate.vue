<template>
	<view class="subcate-block flex-c">
		<view class="subcate-header" :style="{paddingTop: top + 'px'}">
			<view class="subcate-header-top flex">
				<view class="title-left" @tap="toBack">
					<van-icon name="arrow-left" />
				</view>
				<!-- 二级分类标题 -->
				<view class="title">
					{{title}}
				</view>
			</view>
			<!-- 三级分类栏 -->
			<view class="submit-header-btm">
				<scroll-view class="scroll-x-block" scroll-x="true" scroll-left="">
					<view class="third-cate-title" v-for="(item,index) in subcateList" :key="item.id" @tap="onSwitchTab(item,index)" :class="{border_btm: goodsId == item.id}">
						{{item.name}}
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 三级分类内容项 -->
		<scroll-view scroll-y="true" class="scroll-y-block" enable-flex="true" scroll-with-animation="true">
			<view class="second-cate-block flex-c" v-for="(item,index) in subcateList" :key="item.id" v-show="goodsId == item.id">
				<view class="second-cate-title flex-a">
					{{item.name}}
				</view>
				<!-- 三级分类item -->
				<view class="third-cate-block flex">
					<view class="third-cate-item" v-for="(subItem,i) in item.children" :key="subItem.goods_id">
						<GoodsItem :goodsItem="subItem"></GoodsItem>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import { ref } from 'vue';
import GoodsItem from '../../components/GoodsItem/GoodsItem.vue'
import {useMiddle } from '../../hooks/useMiddle.js'
import {getSubcateListAPI} from '../../api/subcate.js'
const title = ref('标题')
const top = ref()
const toBack = () => {
	uni.navigateBack()
}
//获取分类商品数据
const subcateList = ref([])
const getSubCateList = async (data) => {
	const res = await getSubcateListAPI(data)
	subcateList.value = res.result
}
//切换tab事件
const goodsId = ref()
const onSwitchTab = (item,index) => {
	goodsId.value = item.id
}


onLoad((options) => {
	goodsId.value = options.goods_id
	title.value = options.title
	useMiddle('.subcate-header-top').then(res => {
		top.value = res.top
	})
	getSubCateList({...options})
})
</script>

<style lang="scss">
page {
	height: 100%;
	box-sizing: border-box;
}
.subcate-block {
	height: 100%;
	.subcate-header {
		width: 100%;
		height: 126rpx;
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
				.third-cate-title {
					display: inline-block;
					margin: 0 20rpx;
					padding: 8rpx 8rpx 14rpx;
					&.border_btm {
						border-bottom: 1px solid #95332f;
					}
				}
			}
		}
	}
	.scroll-y-block {
		flex: 1;
		overflow: scroll;
		.second-cate-title {
			justify-content: center;
			margin: 60rpx 0 30rpx;
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
</style>

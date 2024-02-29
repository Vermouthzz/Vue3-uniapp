<template>
	<view class="category-block flex-c">
		<header class="custom-header" :style="{paddingTop: safeAreaInsets.top + 'px'}">
			<view class="search flex-a">
				<i class="iconfont icon-search search-icon"></i>
				<input type="text" placeholder="毛巾">
			</view>
		</header>
		<view class="cate-body flex" :style="{height: `calc(100% - ${headerHeight}px)`}">
			<scroll-view scroll-y="true" class="aside-scroll flex-c" enable-flex >
				<view class="scroll-item flex" v-for="(i,index) in asideList" :key="i.category_id" @tap="onChangeList(i,index)">
					<view class="item-text" :class="{border: selectedId == i.category_id}">
						{{i.category_name}}
					</view>
				</view>
			</scroll-view>
			<view class="body-right">
				<view class="right-item" v-if="selectedId == 1">
					<view class="banner-recommend">
						<view class="banner">
							<image class="banner-image" src="https://yanxuan.nosdn.127.net/hxm/oly-picture/08ee4f03c9cc67cc7dbdad343043abcb.jpg?type=webp&imageView&quality=75&thumbnail=750x0"></image>
						</view>
						<view class="banner-list flex">
							<view class="item-img-text flex-c-a" v-for="(item,index) in cateList" :key="index">
								<image class="item-image" src="https://yanxuan.nosdn.127.net/static-union/1686641811181b03.jpg?quality=75&type=webp&imageView"></image>
								<text>无限回购</text>
							</view>
						</view>
					</view>
				</view>
				<view class="right-item" v-else>
					<scroll-view scroll-y="true" class="right-item-scroll">
						<block v-for="item in cateList" :key="item.id">
							<view class="title-item" >
								{{item.category_name}}
							</view>
							<view class="flex-bd flex">
								<view class="right-bd-item flex-c-a" v-for="subItem in item.children" :key="subItem.id" @tap="toSubcate(subItem)">
									<image class="right-bd-image" :src="subItem.img_url"></image>
									<text>{{subItem.category_name}}</text>
								</view>
							</view>
						</block>
					</scroll-view>
				</view>			
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import {onLoad,onReady} from '@dcloudio/uni-app'
import {getCateListAPI} from '../../api/cate.js'
const {safeAreaInsets} = uni.getSystemInfoSync() //获取设备信息

//获取分类列表数据
const cateList = ref([])
const asideList = ref([])
const getCategoryList = async () => {
	const res = await getCateListAPI(selectedId.value)
	cateList.value = res.result.cateList
	asideList.value = res.result.asideList
}
//切换侧边栏操作
const selectedId = ref(1)
const onChangeList = (val,index) => {
	if(selectedId.value == val.category_id) return
	selectedId.value = val.category_id
	getCategoryList()
}
const toSubcate = (item) => {
	uni.navigateTo({
		url: `/catepkg/subCate/subCate?goods_id=${item.category_id}`,
	})
}

const headerHeight = ref(0)
onReady(() => {
	const header = uni.createSelectorQuery().select('.custom-header')
	header.boundingClientRect(res => {
		headerHeight.value = res.height
	}).exec()
})

onLoad(() => {
	getCategoryList()
})
</script>

<style lang="scss">
page {
	height: 100%;
}
.category-block {
	height: 100%;
	.custom-header {
		.search {
			width: 60%;
			height: 40rpx;
			background-color: #efefef;
			margin-left: 20rpx;
			padding: 20rpx 26rpx;
			font-size: 14px;
			input {
				margin-left: 4rpx;
			}
		}
	}
	.cate-body {
		padding-top: 10rpx;
		box-sizing: border-box;
		.aside-scroll {
			width: 170rpx;
			height: 100%;
			// padding-bottom: 182rpx;
			border-right: 1px solid #dadada;
			box-sizing: border-box;
			.scroll-item {
				position: relative;
				justify-content: center;
				padding: 24rpx 20rpx;
				margin: 2rpx 0;
				.item-text {
					font-size: 14px;
					&.border::before {
						content: '';
						position: absolute;
						left: 0;
						top: 20rpx;
						width: 6rpx;
						height: 44rpx;
						background-color: #d71d21;
					}
				}
				
			}
		}
		.body-right {
			flex: 1;
			.right-item {
				height: 100%;
				box-sizing: border-box;
				.banner-recommend {
					padding: 26rpx 30rpx 0;
					.banner {
						.banner-image {
							width: 100%;
							height: 192rpx;
						}
					}
					.banner-list {
						flex-wrap: wrap;
						justify-content: space-between;
						.item-img-text {
							margin-top: 20rpx;
							text {
								font-size: 10px;
							}
							.item-image {
								width: 144rpx;
								height: 144rpx;
								margin-bottom: 4rpx;
								border-radius: 12px;
							}
						}
					}
				}
				.right-item-scroll {
					height: 100%;
					padding: 10rpx 0 0rpx 20rpx;
					box-sizing: border-box;
					.title-item {
						font-size: 14px;
						font-weight: 500;
						padding: 12rpx 0;
						border-bottom: 1px solid #dadada;
					}
					.flex-bd {
						flex-wrap: wrap;
						padding: 20rpx 0;
						.right-bd-item {
							padding: 0 30rpx;
							margin-bottom: 30rpx;
							.right-bd-image {
								width: 120rpx;
								height: 120rpx;
								margin-bottom: 12rpx;
							}
							text {
								font-size: 12px;
							}
						}
					}
				}
			}
		}
	}
}
</style>

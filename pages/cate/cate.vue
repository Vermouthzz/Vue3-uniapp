<template>
	<view class="category-block flex-c">
		<header class="custom-header" :style="{paddingTop: safeAreaInsets.top + 'px'}">
			<view class="search flex-a">
				<uni-icons class="search-icon" type="search" size="20"></uni-icons>
				<input type="text" placeholder="毛巾">
			</view>
		</header>
		<view class="cate-body flex">
			<scroll-view scroll-y="true" class="aside-scroll flex" >
				<view class="scroll-item flex" v-for="(i,index) in categoryList" :key="i.category_id" @tap="onChangeList(i,index)">
					<view class="item-text" :class="{border: activeIndex == index}">
						{{i.category_name}}
					</view>
				</view>
			</scroll-view>
			<view class="body-right">
							<view class="right-item" v-show="activeIndex == 0">
									<view class="banner">
										<image class="banner-image" src="https://yanxuan.nosdn.127.net/hxm/oly-picture/08ee4f03c9cc67cc7dbdad343043abcb.jpg?type=webp&imageView&quality=75&thumbnail=750x0"></image>
									</view>
									<view class="banner-list flex">
										<view class="item-img-text flex-c-a" v-for="i in 6" :key="i">
											<image class="item-image" src="https://yanxuan.nosdn.127.net/static-union/1686641811181b03.jpg?quality=75&type=webp&imageView"></image>
											<text>无限回购</text>
										</view>
									</view>
							</view>
							<view class="right-item">
								<scroll-view scroll-y="true" class="right-item-scroll">
									<block v-for="item in currentList.children" :key="item.id">
										<view class="title-item" >
											{{item.name}}
										</view>
										<view class="flex-bd flex">
											<view class="right-bd-item flex-c-a" v-for="subItem in item.children" :key="subItem.id" @tap="toSubcate(subItem)">
												<image class="right-bd-image" :src="subItem.imgUrl"></image>
												<text>{{subItem.name}}</text>
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
import { onMounted, ref } from "vue";
import {onLoad} from '@dcloudio/uni-app'
import {getCateListAPI} from '../../api/cate.js'
const {safeAreaInsets} = uni.getSystemInfoSync() //获取设备信息

//获取分类列表数据
const categoryList = ref([])
const getCategoryList = async () => {
	const res = await getCateListAPI()
	categoryList.value = res
}
//切换侧边栏操作
const currentList = ref({})
const activeIndex = ref(0)
const onChangeList = (val,index) => {
	activeIndex.value = index
	currentList.value = val
}
const toSubcate = (item) => {
	const name = currentList.value.category_name
	uni.navigateTo({
		url: `/catepkg/subCate/subCate?id=${item.parentId}&parent_id=${item.firParentId}&goods_id=${item.id}&title=${name}`,
	})
}

onMounted(() => {
	getCategoryList()
})
</script>

<style lang="scss">
page {
	height: 100%;
	overflow: hidden;
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
		margin-top: 10rpx;
		height: 100%;
		.aside-scroll {
			width: 170rpx;
			height: 100%;
			box-sizing: border-box;
			border-right: 1px solid #dadada;
			padding-bottom: 130rpx;
			.scroll-item {
				position: relative;
				justify-content: center;
				padding: 30rpx 20rpx;
				margin: 2rpx 0;
				.item-text {
					font-size: 14px;
					&.border::before {
						content: '';
						position: absolute;
						left: 0;
						top: 26rpx;
						width: 6rpx;
						height: 44rpx;
						background-color: #d71d21;
					}
				}
				
			}
		}
		.body-right {
			flex: 1;
			padding: 30rpx 20rpx 0;
			.right-item {
				height: 100%;
				.banner {
					.banner-image {
						width: 100%;
						height: 260rpx;
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
							width: 160rpx;
							height: 160rpx;
							margin-bottom: 4rpx;
							border-radius: 12px;
						}
					}
				}
				.right-item-scroll {
					height: 100%;
					box-sizing: border-box;
					padding-bottom: 96rpx;
					.title-item {
						font-size: 14px;
						font-weight: 500;
						// color: #313131;
						padding-bottom: 8rpx;
						border-bottom: 1px solid #dadada;
					}
					.flex-bd {
						flex-wrap: wrap;
						.right-bd-item {
							width: 33%;
							margin-top: 20rpx;
							margin-bottom: 56rpx;
							.right-bd-image {
								width: 120rpx;
								height: 120rpx;
								margin-bottom: 30rpx;
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

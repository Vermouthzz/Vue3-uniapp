<template>
	<IndexPopup></IndexPopup>
	<CustomHeader :scroll="scroll"></CustomHeader>
	<scroll-view scroll-y="true" class="scroll-box" @scroll="handleScroll" @scrolltolower="onLoadMore">
		<Search ></Search>
		<!-- 导航栏 -->
		<index-nav></index-nav>
		<!-- 内容栏 -->
		<view class="content">
			<scroll-view scroll-x="true" class="scroll-list">
				<view class="items">猜你喜欢</view>
				<view class="items">猜你喜欢</view>
				<view class="items">猜你喜欢</view>
				<view class="items">猜你喜欢</view>
				<view class="items">猜你喜欢</view>
				<view class="items">猜你喜欢</view>
			</scroll-view>
			<view class="content-block flex-c">
				<view class="block-top flex">
					<view class="top-left">
						<swiper class="swiper-a" @change="swiperChange" duration="3" autoplay="true">
							<swiper-item class="swiper-item-a" v-for="(item,index) in swiperImgList" :key="item.id">
								<image :src="item.img_url" @tap="onClickImg(item,index)"></image>
							</swiper-item>
						</swiper>
						<view class="dot">
							<text>{{current}}</text>
							<text>/</text>
							<text>{{swiperImgList.length}}</text>
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
				<view class="body-content flex">
					 <!-- 左侧list -->
					<view class="body-list left-list"> 
						<view class="rank flex">
							<view class="rank-item flex-c-a" v-for="i in 4" :key="i">
								<view class="r-item-title flex-c-a">
									<text class="title-weight">严选榜单</text>
									<text class="title-s">大家都在买</text>
								</view>
								<image class="r-item-img" src="https://yanxuan-item.nosdn.127.net/879d6919fa093140c38336eec736e4b1.png?type=webp&imageView&quality=65&thumbnail=330x330" mode="widthFix">
								</image>
							</view>
						</view>
						<block v-for="item in leftList" :key="item.goods_id">
							<GoodsItem :goodsItem="item">
								<template #footer>
									<view class="everyday-time flex-a">
										<text class="every-date ">每日抄底</text>
										<text class="end-time">距结束13小时</text>
									</view>
								</template>
							</GoodsItem>
						</block>
					</view>
					<!-- 右侧list -->
					<view class="body-list">
						<block v-for="item in rightList" :key="item.goods_id">
							<GoodsItem class="goods-item" :goodsItem="item">
								<template #footer>
									<view class="everyday-time flex-a">
										<text class="every-date ">每日抄底</text>
										<text class="end-time">距结束13小时</text>
									</view>
								</template>
							</GoodsItem>
						</block>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {onMounted,ref} from "vue";
import Search from './components/Search.vue'
import CustomHeader from './components/CustomHeader.vue'
import GoodsItem from '../../components/GoodsItem/GoodsItem.vue'
import IndexNav from './components/IndexNav.vue'
import IndexPopup from './components/IndexPopup.vue'
import {getHomeListAPI} from '../../api/index.js'
const swiperImgList = [{
		id: 1,
		img_url: 'https://yanxuan-item.nosdn.127.net/e54a19cb355aa22cb8d6b914dd8aa6a9.jpg?type=webp&imageView&quality=65&thumbnail=330x330'
	},
	{
		id: 2,
		img_url: 'https://yanxuan-item.nosdn.127.net/10bccd52a8a49022cac8506c210be677.jpg?type=webp&imageView&quality=65&thumbnail=330x330'
	},
	{
		id: 3,
		img_url: 'https://yanxuan-item.nosdn.127.net/8dc0bd2d7e58ace9465aa0cc28998721.png?type=webp&imageView&quality=65&thumbnail=330x330'
	},
	{
		id: 4,
		img_url: 'https://yanxuan-item.nosdn.127.net/c56dd747c5fd8481ceae603f54286d41.jpg?type=webp&imageView&quality=65&thumbnail=330x330'
	}
]
const current = ref(1)
//轮播图current改变时调用此函数
const swiperChange = (e) => {
	current.value = e.detail.current + 1
}
const onClickImg = (item, index) => {
	uni.previewImage({
		urls: swiperImgList.map(item => item.img_url),
		count: item.img_url,
		current: index
	})
}
//倒计时效果
const date = ref('')

const scroll = ref(false)
const handleScroll = (e) => {
	e.detail.scrollTop > 30 ? scroll.value = true : scroll.value = false
}
//获取列表

const leftList = ref([])
const rightList = ref([])
const indexData = ref({
	page: 1,
	pageSize: 12,
})
const getHomeList = async () => {
	const res = await getHomeListAPI(indexData.value)
	console.log(res);
	leftList.value = res.leftData
	rightList.value = res.rightData
}
//获取更多列表
let flag = ref(true)
const onLoadMore = async () => {
	if(flag.value) {
		flag.value = false
		indexData.value.page++
		const res = await getHomeListAPI(indexData.value)
		if(res.length == 0) return
		leftList.value = [...leftList.value, ...res.leftData]
		rightList.value = [...rightList.value, ...res.rightData]
		flag.value = true
	}
}

onMounted(() => {
	getHomeList()
})
</script>

<style lang="scss">
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background-color: transparent;
		color: transparent;
	}
	page {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.scroll-box {
		flex: 1;
		height: calc(100% - 140rpx);
		.content {
			margin-top: 40rpx;
			padding: 0 20rpx;

			.scroll-list {
				height: 60rpx;
				white-space: nowrap;

				.items {
					display: inline-block;
					width: 25%;
					margin-right: 20rpx;
					font-size: 14px;
					color: #666;
				}

				.items:last-child {
					margin-right: 0;
				}
			}

			.content-block {
				.block-top {
					.top-left {
						position: relative;
						width: 50%;
						margin-right: 20rpx;

						.swiper-a {
							height: 480rpx;

							.swiper-item-a {
								image {
									width: 100%;
									border-radius: 12px;
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
			}
			
			.body-content {
				margin-top: 20rpx;
				justify-content: space-between;
				box-sizing: border-box;
				.left-list {
					margin-right: 22rpx;
				}
				.body-list {
					width: 50%;
					.rank {
						flex-wrap: wrap;
						.rank-item {
							flex: 1;
							margin: 30rpx 0;
							.r-item-title {
								.title-weight {
									font-size: 14px;
									font-weight: 550;
								}
								.title-s {
									margin-top: 8rpx;
									font-size: 10px;
									color: #828282;
								}
							}
							.r-item-img {
								width: 134rpx;
							}
						}
					}
					.everyday-time {
						width: 96%;
						height: 50rpx;
						margin: 8rpx 0 0 -2rpx;
						border-radius: 15px;
						background-color: #fde9eb;
					
						.every-date {
							display: block;
							width: 40%;
							height: 40rpx;
							text-align: center;
							line-height: 40rpx;
							margin: 0 8rpx;
							border-radius: 30rpx;
							font-size: 12px;
							color: #fff;
							background-color: #f62436;
						}
					
						.end-time {
							width: 60%;
							display: block;
							color: #f62436;
							font-size: 12px;
						}
					}
				}
				
			}
		}
	}
</style>
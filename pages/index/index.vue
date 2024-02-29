<template>
	<scroll-view scroll-y="true" class="index-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}" @scroll="handleScroll" @scrolltolower="onLoadMore" enable-flex :scroll-top="scrollTop">
		<view class="index-body flex-c" >
			<view class="sticky fff">
				<index-header :scroll="scroll"></index-header>
			</view>
			<Search :list="indexStore.searchData"></Search>
			<!-- 导航栏 -->
			<index-nav :list="navList"></index-nav>
			<!-- 内容栏 -->
			<view class="content">
				<scroll-view scroll-x="true" class="scroll-list flex-a fff">
					<view class="items" @tap="onSwitch(item,index)" :class="{active: index == currentIndex}" v-for="(item, index) in scrollXList" :key="index">{{item.name}}</view>
				</scroll-view>
				<view class="content-block flex-c">
					<template v-if="currentIndex == 0">
						<new-every :imgs="swiperImgList"></new-every>
					</template>
					<LoveList :list="homeList">
						<view v-if="currentIndex == 0">
							<template #rank>
								<view class="rank flex">
								    <view class="rank-item flex-c-a" @tap="toRankList(i)" v-for="i in 4" :key="i">
								      <view class="r-item-title flex-c-a">
								        <text class="title-weight">严选榜单</text>
								        <text class="title-s">大家都在买</text>
								      </view>
								      <image class="r-item-img" src="https://yanxuan-item.nosdn.127.net/879d6919fa093140c38336eec736e4b1.png?type=webp&imageView&quality=65&thumbnail=330x330" mode="widthFix">
								      </image>
								    </view>
								  </view>
							</template>
						</view>
					</LoveList>
				</view>
			</view>
		</view>
	</scroll-view>
	<!-- #ifdef H5 -->
	<custom-tabbar></custom-tabbar>
	<!-- #endif -->
	<!-- <IndexPopup></IndexPopup> -->
</template>

<script setup>
import {onLoad, onReady} from '@dcloudio/uni-app'
import {onMounted,ref} from "vue"
import CustomTabbar from './components/CustomTabbar.vue'
import Search from './components/Search.vue'
import NewEvery from './components/NewEvery.vue'
import IndexHeader from './components/IndexHeader.vue'
import GoodsItem from '../../components/GoodsItem/GoodsItem.vue'
import IndexNav from './components/IndexNav.vue'
import IndexPopup from './components/IndexPopup.vue'
import {getHomeListAPI, getHomeNavListAPI} from '../../api/index.js'
import {useIndexStore} from '../../store/useIndexStore.js'
const indexStore = useIndexStore()
const { safeAreaInsets,screenWidth } = uni.getSystemInfoSync()
const swiperImgList = ref([])

//scroll-x列表
const scrollXList = ref([
	{ name: '猜你喜欢', id: [], list: [] },
	{ name: '居家生活', ids: [2,4,5,6,7], list: [] },
	{ name: '美食酒水', id: [3,8,9,10,24], list: [] },
	{ name: '个护清洁', id: [5,21,11], list: [] },
	{ name: '鞋饰服包', id: [20,21], list: [] },
	{ name: '运动旅行', id: [15,20,12], list: [] },
	{ name: '母婴亲子', id: [22,14,13], list: [] },
])
const scrollTop = ref(0)
//切换列表
const currentIndex = ref(0) //当前列表
const onSwitch = (item,index) => {
	currentIndex.value = index
	scrollTop.value = headerHeight.value + Math.ceil(screenWidth / 750 * 94)
	indexData.value.page = 1
	getHomeList()
}
//滑动距离
const scroll = ref(false)
const handleScroll = (e) => {
	e.detail.scrollTop > 35 ? scroll.value = true : scroll.value = false
}


//获取列表
const indexData = ref({
	page: 1,
	pageSize: 12,
})
const homeList = ref([])
const getHomeList = async () => {
	const res = await getHomeListAPI(indexData.value,scrollXList.value[currentIndex.value])
	homeList.value = res.result
	if(res.list) {
		swiperImgList.value = res.list
	}
}
//获取更多列表
let flag = ref(true)
const onLoadMore = async () => {
	if(flag.value) {
		flag.value = false
		indexData.value.page++
		const res = await getHomeListAPI(indexData.value)
		if(res.length == 0) return
		homeList.value.push(...res.result)
		flag.value = true
	}
}

//获取Nav列表
const navList = ref([])
const getHomeNavList = async () => {
	const res = await getHomeNavListAPI()
	navList.value = res.result.navList
	indexStore.addSearchData(res.result.data)
}

const toRankList = (id) => {
	uni.navigateTo({
		url: `/indexpkg/rankList/rankList?id=${id}`
	})
}
const headerHeight = ref(0)
onReady(() => {
	const header = uni.createSelectorQuery().select('.sticky')
	header.boundingClientRect(res => headerHeight.value = res.height).exec()
})

onLoad(() => {
	getHomeNavList()
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
		box-sizing: border-box;
	}
	.index-block {
		height: 100%;
		/* #ifdef H5 */
		height: calc(100% - 55px);
		/* #endif */
		box-sizing: border-box;
		.index-body {
			position: relative;
			.sticky {
				position: sticky;
				top: 0;
				z-index: 9999;
			}
			.content {
				margin-top: 40rpx;
				padding: 0 20rpx;
				.scroll-list {
					position: sticky;
					top: 94rpx;
					padding: 20rpx 0;
					white-space: nowrap;
					z-index: 998;
					.items {
						display: inline-block;
						width: 25%;
						margin-right: 20rpx;
						font-size: 24rpx;
						color: #6c6c6c;
						&.active {
							font-size: 32rpx;
							color: #333;
						}
					}
		
					.items:last-child {
						margin-right: 0;
					}
				}
				.content-block {
					:deep(.love-block) {
						padding: 0;
					}
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
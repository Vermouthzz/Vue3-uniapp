<template>
	<view class="search-box flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<view class="top-search">
			<CustomHeader :title="'搜索'"></CustomHeader>
			<view class="search-block flex-a">
				<view class="search">
					<van-search
					  @change="onChange"
					  :value="searchValue"
					  shape="round"
					  :use-left-icon-slot="true"
					  placeholder="请输入搜索关键词"
					>
					</van-search>
				</view>
				<text class="cancel" @tap="onTapRight">{{searchValue.length ? '搜索': '取消'}}</text>
			</view>
		</view>
		<view class="scroll-search" :style="{height: `calc(100vh - 200rpx - ${safeAreaInsets.top}px)`}">
			<template v-if="show">
				<view class="search-body flex-c">
					<!-- 搜索历史板块 -->
					<HotSearch :title="'搜索历史'" :list="searchStore.searchList"
							   :item="searchValue" @itemChange="onItemChange"
					/>
					<!-- 热门搜索板块 -->
					<HotSearch :title="'热门搜索'" :item="searchValue" />
				</view>
				<!-- 热门分类板块 -->
				<HotCate></HotCate>
			</template>
			<template v-else>
				<SearchDetail :list="searchResult"></SearchDetail>
			</template>
		</view>
	</view>
</template>

<script setup>
import HotCate from './components/HotCate.vue'
import HotSearch from './components/HotSearch.vue'
import SearchDetail from "./SearchDetail.vue"
import {useSearchStore} from '../../store/useSearchStore.js'
import { computed, ref, provide, watch } from 'vue'
import {getSearchResultAPI} from '../../api/search.js'
const searchStore = useSearchStore()
const {safeAreaInsets} = uni.getSystemInfoSync()

const type = ref(1)
provide('type',type)
watch(type,(type,preType) => {
	if(type != preType) {
		getSearchResultList()
	}
})

const searchValue = ref('') //搜索框value
const onTapRight = () => {
	if(searchValue.value.length == 0) {
		uni.navigateBack()
	} else {
		searchStore.addSearchItem(searchValue.value)
		getSearchResultList()
	}
}
//点击搜索历史和热门搜索进行跳转
const onItemChange = (val) => {
	searchValue.value = val
	searchStore.addSearchItem(val)
	getSearchResultList()
}

const show = ref(true) //控制searchDetail显示
const onChange = (e) => {
	searchValue.value = e.detail
	if(searchValue.value == '') {
		show.value = true
	}
}


//搜索查询结果
const searchResult = ref([])
const getSearchResultList = async () => {
	uni.showLoading({ mask:true })
	const res = await getSearchResultAPI(searchValue.value,type.value)
	searchResult.value = res.list
	show.value = false
	uni.hideLoading()
}

</script>

<style lang="scss">
page {
	height: 100vh;
}
.search-box {
	height: 100vh;
	box-sizing: border-box;
	.title {
		color: #808080;
		margin-bottom: 26rpx;
	}
	.top-search {
		height: 200rpx;
		.search-block {
			margin-top: 6px;
			.search {
				width: 88vw;
			}
			.cancel {
				margin-right: 8rpx;
			}
		}
	}
	.scroll-search {
		
		// overflow: scroll;
		.search-body {
			padding: 0 36rpx;
			margin-top: 16rpx;
		}
	}
}
</style>

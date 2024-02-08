<template>
	<view class="goods-list-block" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'商品列表-网易严选'" :middle="true"></CustomHeader>
		<view class="goods-list-body flex-c">
			<CateBlock></CateBlock>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {getGoodsListAPI} from '../../api/cate.js'
import CateBlock from './components/CateBlock.vue'
const {safeAreaInsets} = uni.getSystemInfoSync()

const getGoodsList = async (id) => {
	const res = await getGoodsListAPI(id)
	console.log(res);
}

onLoad((options) => {
	getGoodsList(options.id)
})
</script>

<style lang="scss">
page {
	height: 100vh;
}
.goods-list-block {
	height: 100%;
	box-sizing: border-box;
	.goods-list-body {
		padding: 0 18rpx;
	}
}
</style>

<template>
	<template v-if="list.length">
		<scroll-view scroll-y="true" class="detail-bd flex-c">
			<search-tab></search-tab>
			<view class="search-item-block flex">
				<view class="goods-item" v-for="(item,index) in list" :key="index">
					<GoodsItem :goodsItem="item"></GoodsItem>
				</view>
			</view>
		</scroll-view>
	</template>
	<template v-else>
		<view class="no-result flex-c-a">
			<view class="bgc"></view>
			<text>您寻找的商品还未上架</text>
		</view>
	</template>
</template>

<script setup>
import { ref } from 'vue';
import CustomHeader from '../../components/CustomHeader/CustomHeader.vue'
import SearchTab from './components/SearchTab.vue'
import GoodsItem from '../../components/GoodsItem/GoodsItem.vue'
const {safeAreaInsets} = uni.getSystemInfoSync()
defineProps(['list'])


// const type = ref(1)  //默认为综合排序
</script>

<style lang="scss">
.detail-bd {
	height: 100%;
	box-sizing: border-box;
	.search-item-block {
		flex-wrap: wrap;
		.goods-item {
			width: 46vw;
			margin: 20rpx 0 6rpx 20rpx;
			&:nth-child(2n) {
				margin-right: 0;
			}
		}
	}
}
.no-result {
	height: 100%;
	justify-content: center;
	padding-bottom: 180rpx;
	box-sizing: border-box;
	.bgc {
		width: 290rpx;
		height: 290rpx;
		background-image: url('https://yanxuan-static.nosdn.127.net/hxm/yanxuan-mall-wap/assets/img/defaultPage-fa86828d57f34836cd69ecd870e80d86.png');
		background-size: 600rpx 600rpx;
		background-position: -342rpx 56rpx;
	}
}
</style>
<template>
	<view class="custom-tabbar flex-a">
		<view class="tabbar-block flex-c-a" v-for="(item,index) in list" :key="item.text" @tap="onSwitchTab(item,index)">
			<i class="iconfont" :class="[`icon-${item.icon}`, activeIndex == index ? 'active' : '']"></i>
			<text class="name">{{item.text}}</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const activeIndex = ref(0)
const list = [
	{ text: '首页', icon: 'home', path: '/pages/index/index' },
	{ text: '分类', icon: 'category', path: '/pages/cate/cate' },
	{ text: '购物车', icon: 'cart', path: '/pages/cart/cart' },
	{ text: '个人', icon: 'profile', path: '/pages/profile/profile' }
]

const onSwitchTab = (item,index) => {
	activeIndex.value = index
	uni.switchTab({ url: item.path })
}
</script>

<style scoped lang="scss">
.custom-tabbar {
	width: 420px;
	height: 55px;
	border-top: 1px solid #ccc;
	padding: 10rpx 0;
	box-sizing: border-box;
	.tabbar-block {
		flex: 1;
		.iconfont {
			font-size: 42rpx;
		}
		.active {
			color: #d81e06;
		}
		.name {
			margin-top: 12rpx;
			font-size: 26rpx;
		}
	}
}
</style>
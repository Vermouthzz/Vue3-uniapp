<template>
	<header class="header">
		<view class="profile-login flex">
			<view class="avator" @tap="toUserInfo">
				<image class="avator-image" :src="userStore.userInfo.avator" v-if="userStore.userInfo?.avator"></image>
				<image class="avator-image" src="https://img.zcool.cn/community/01e0ae58ae3d72a801219c77fadb52.png@1280w_1l_2o_100sh.png" v-else></image>
			</view>
			<view class="profile-info flex-c" v-if="!userStore.userInfo">
				<text>未登录</text>
				<view @tap="toLogin">点击登录账号</view>
			</view>
			<view class="profile-info flex-c" v-else>
				<text>{{userStore.userInfo.nickname}}</text>
				<view>{{userStore.userInfo.sign}}</view>
			</view>
		</view>
	</header>
	<view class="fixed-header flex-a" v-show="props.flag" :style="{paddingTop: safeAreaInsets.top + 'px',paddingBottom: safeAreaInsets.top + 'px' }">
		<block v-if="userStore.userInfo">
			<image :src="userStore.userInfo?.avator" class="fixed-image" @tap="toUserInfo"></image>
			<text>{{userStore.userInfo.nickname}}</text>
		</block>
		<block v-else>
			<image src="https://img.zcool.cn/community/01e0ae58ae3d72a801219c77fadb52.png@1280w_1l_2o_100sh.png" class="fixed-image" @tap="toLogin"></image>
			<text>未登录</text>
		</block>
	</view>
</template>

<script setup>
import {useUserStore} from '../../../store/useUserStore.js'
const userStore = useUserStore()
const props = defineProps()
const {safeAreaInsets} = uni.getSystemInfoSync()

const toLogin = () => {
	uni.navigateTo({
		url: '/indexpkg/login/login'
	})
}

const toUserInfo = () => {
	let url = ''
	!userStore.userInfo ? url = '/indexpkg/login/login' : url = '/subpkg/userinfo/userinfo'
	uni.navigateTo({
		url
	})
}
</script>

<style lang="scss">
	.header {
		background-color: skyblue;
		border-radius: 0 0 60rpx 60rpx;
		padding: 200rpx 0 70rpx 40rpx;
		.profile-login {
			.avator {
				margin-right: 20rpx;
				.avator-image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}
			.profile-info {
				justify-content: space-around;
				text {
					font-size: 20px;
				}
			}
		}
	}
	.fixed-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		padding-left: 24rpx;
		background-color: skyblue;
		z-index: 100;
		.fixed-image {
			width: 60rpx;
			height: 60rpx;
			margin-right: 16rpx;
			border-radius: 50%;
		}
	}
</style>
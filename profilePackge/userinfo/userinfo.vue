<template>
	<view class="user-header" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'个人中心'" :middle="true"></CustomHeader>
		<view class="change-avator">
			<view class="u-avator">
				<image class="u-avator-image" :src="userInfo.avator" @tap="getUserProfile"></image>
			</view>
			<view class="u-change" @tap="changeAvator">
				点击修改头像
			</view>
		</view>
	</view>		
	<view class="u-body">
		<view class="detail-bd">
			<InfoItem :userInfo="userInfo"></InfoItem>
			<view class="storge-block">
				<button @tap.prevent="onSubmit" class="submit-btn">保存</button>
			</view>
			<view class="out-btn">
				<button @tap.prevent="onClear" class="submit-btn">退出登录</button>
			</view>
		</view>
	</view>
	
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {reactive, ref} from 'vue'
import {useUserStore} from '../../store/useUserStore.js'
import InfoItem from './components/InfoItem.vue'
import {updateUserInfo} from '../../api/user.js'
const {userInfo,clearUserInfo} = useUserStore()
const {safeAreaInsets} = uni.getSystemInfoSync()

const onClear = () => {
	clearUserInfo()
	uni.navigateBack()
}

// const getUserProfile = () => {
// 	console.log(11);
// 	wx.getUserProfile({
// 		desc: '用于获取个人信息头像昵称',
// 		success: (res) => {
// 			console.log(res);
// 		},
// 	})
// }
//修改头像
const changeAvator = () => {
	uni.chooseImage({
		count: 1,
		sourceType: 'album',
		success: (res) => {
			const path = res.tempFiles[0].path
			uni.uploadFile({
				url: '/upload',
				filePath: path,
				name: 'file',
				formData: {
					id: userInfo.u_id
				},
				success: (result) => {
					if(result.statusCode === 200) {
						const data = JSON.parse(result.data)
						userInfo.avator = data.avator
						uni.showToast({
							icon: 'success',
							title: '更换成功'
						})
					}				
				},
			})
		}
	})
}

const onSubmit = async () => {
	const {nickname, sign, gender} = userInfo
	await updateUserInfo(nickname,sign, gender)
	uni.showToast({
		icon: 'success',
		title: '更新成功'
	})
}
</script>

<style lang="scss">
page {
	height: 100%;
	overflow: hidden;
	box-sizing: border-box;
}
.user-header {
	display: flex;
	flex-direction: column;
	background-color: antiquewhite;
	.change-avator {
		margin: 0 auto;
		.u-avator {
			margin: 30rpx 0 12rpx;
			.u-avator-image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
		}
		.u-change {
			font-size: 12px;
			margin-bottom: 10rpx;
		}
	}

}
.u-body {
	padding: 16rpx 16rpx 0;
	.detail-bd {
		padding: 20rpx;
		background-color: #fff;
		.storge-block {
			margin: 80rpx 0 20rpx;
			.submit-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: antiquewhite;
				color: #fff;
			}
		}
	}
}
</style>

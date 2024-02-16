<template>
	<view class="user-header" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="个人中心" :middle="true"></CustomHeader>
		<view class="u-avator">
			<image class="u-avator-image" :src="userInfo.avator"></image>
		</view>
		<view class="u-change" @tap="changeAvator">
			点击修改头像
		</view>
	</view>		
	<view class="u-body">
		<view class="detail-bd">
			<InfoItem></InfoItem>
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
const {userInfo,clearUserInfo} = useUserStore()
const {safeAreaInsets} = uni.getSystemInfoSync()

const onClear = () => {
	clearUserInfo()
	uni.navigateBack()
}
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
const onRadioChange = (e) => {
	userInfo.gender = e.detail.value
}
const onDateChange = (e) => {
	userInfo.birthday = e.detail.value
}
const onSubmit = () => {
	uni.request({
		url: '/userinfo',
		data: userInfo,
		method: 'POST',
		success: (res) => {
			if(res.statusCode === 200) {
				uni.showToast({
					icon: 'success',
					title: '更新成功'
				})
			}
		}
	})
}
onLoad(() => {
	
})
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
	align-items: center;
	background-color: antiquewhite;
	.u-top {
		position: relative;
		width: 100%;
		.u-left {
			margin-left: 10rpx;
		}
		.u-title {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}
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
.u-body {
	padding: 16rpx 16rpx 0;
	.detail-bd {
		padding: 20rpx;
		background-color: #fff;
		.storge-block {
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

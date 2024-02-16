<template>
	<view class="login-box">
		<header class="login-header flex" :style="{paddingTop : top + 'px'}">
			<view class="h-left">
				<navigator url="/pages/index/index"><van-icon name="home-o" size="36rpx"></van-icon></navigator>
			</view>
			<view class="h-mid">
				<navigator url="/pages/index/index">网易严选</navigator>
			</view>
		</header>
		<view class="body flex-c"> 
			<view class="content">
				<view class="img-logo">
					<image class="content-image" src="https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"></image>
				</view>
				<view class="login-info">
					<view class="titles">
						{{ isRegister ? '免费注册' : '欢迎登录' }}
					</view>
					<view class="login-register-block flex-c">
						<uni-forms ref="form" modelValue="formData">
							<view class="form-item-login">
								<uni-forms-item >
									<view class="item-input">
										<input type="text" v-model="formData.acconut" placeholder="请输入您的账号">
									</view>
								</uni-forms-item>
							</view>
							<view class="form-item-login">
								<uni-forms-item class="form-item">
									<view class="item-input">
										<input type="text" v-model="formData.password" placeholder="请输入您的密码">
									</view>
								</uni-forms-item>
							</view>
						</uni-forms>
						<view class="not-reg flex-a">
							<view class="not item">
								忘记密码
							</view>
							<view class="reg item" @tap="toRegister">
								{{isRegister ? '去登陆' : '免费注册' }}
							</view>
						</view>
						<view class="agree flex-a">
							<view class="radio">
								<checkbox  @tap="oncheck" />
							</view>
							我已阅读并同意用户协议和隐私协议 	
						</view>
						<view class="submit-block">
							<button @tap="handleSubmit" class="btn-login-reg">{{isRegister ? '注册' : '登录' }}</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view> 
</template>

<script setup>
import { ref } from "vue"
import {onReady} from '@dcloudio/uni-app'
import {middle} from '../../hooks/useMiddle.js'
import {useUserStore} from '../../store/useUserStore.js'
import {useCartStore} from '../../store/useCartStore.js'
import {useUserCardStore} from '../../store/useUserCardStore.js'
const top = ref(0)
const isAgree = ref(false) //是否同意协议
const isRegister = ref(false) //是否注册
const userStore = useUserStore()
const userCardStore = useUserCardStore()
const cartStore = useCartStore()
const toRegister = () => {
	isRegister.value = !isRegister.value
	formData.value = {}
}
const formData = ref({
	acconut: '',
	password: ''
})
const oncheck = () => {
	isAgree.value = !isAgree.value
}
//注册或登录提交	
const handleSubmit = () => {
	if(!isAgree.value) {
		uni.showToast({
			icon: 'success',
			title: '请同意协议'
		})
		return
	}
	if(isRegister.value) {  //注册逻辑
		uni.request({
			url: '/register',
			method: 'POST',
			header: {
				'content-type': 'application/json'
			},
			data: {
				account: formData.value.acconut,
				password: formData.value.password
			},
			success: (res) => {
				console.log(res);
				if(res.data.status === '200') {
					uni.showToast({
						icon: 'success',
						title: '注册成功'
					})
				}
			}
		})
	} else {   //登录逻辑
		uni.request({
			url: '/login',
			method: 'POST',
			header: {
				'content-type': 'application/json'
			},
			data: {
				account: formData.value.acconut,
				password: formData.value.password
			},
			success: (result) => {
				if(result.data.status === '200') {
					const {data: res} = result
					userStore.setUserInfo(res.data)
					uni.showToast({
						icon: 'success',
						title: '登录成功'
					})
					cartStore.getCartList()
					userCardStore.getUserCardInfo(res.data.user_id)
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/profile/profile'
						})
					}, 500)
				}
			}
		})
	}
}
onReady(() => {
	middle('.login-header').then(data => top.value = data.top)
})
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #f2f5f4;
	}
	.login-box {
		height: 100%;
		padding: 0 40rpx;
		.login-header {
			padding: 0 5px;
			background-color: #fafafa;
			border-bottom: 1px solid ;
		}
		.body {
			.content {
				.img-logo {
					margin-top: 60rpx;
					.content-image {
						width: 334rpx;
						height: 120rpx;
					}
				}
				.login-info {
					.titles {
						margin-top: 30rpx;
						font-size: 24px;
						font-weight: 700;
					}
					.login-register-block {
						margin-top: 60rpx;
						.form-item-login {
							margin-bottom: 40rpx;
							.item-input {
								padding-bottom: 30rpx;
								border-bottom: 1px solid #bbb;
							}
						}
						.not-reg {
							justify-content: space-between;
							margin-top: -30rpx;
							font-size: 12px;
							.item {
								padding: 10rpx 20rpx;
							}
						}
						.agree {
							margin: 40rpx 0 30rpx;
							font-size: 14px;
						}
						.submit-block {
							.btn-login-reg {
								background-color: #ffeef1;
							}
						}
					}
				}
			}
		}
	}

</style>

<template>
	<view class="login-box">
		<view class="body flex-c"> 
			<view class="content">
				<view class="img-logo">
					<image class="content-image" src="https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"></image>
				</view>
				<view class="login-info">
					<view class="login-register-block flex-c">
						<form class="login-form" >
							<view class="username flex-a">
								<i class="iconfont icon-profile"></i>
								<input v-model="formData.acconut" type="text" class="name-input">
								<i class="iconfont icon-clear_circle"></i>
							</view>
							<view class="password flex-a">
								<i class="iconfont icon-Password"></i>
								<input v-model="formData.password" type="safe-password" class="password-input">

							</view>
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
						</form>
					</view>
				</view>
			</view>
		</view>
	</view> 
</template>

<script setup>
import { ref } from "vue"
import {useUserStore} from '../../store/useUserStore.js'
import {useCartStore} from '../../store/useCartStore.js'
import {useUserCardStore} from '../../store/useUserCardStore.js'
import {useAddressStore} from '../../store/useAddressStore.js'
const isAgree = ref(false) //是否同意协议
const isRegister = ref(false) //是否注册
const userStore = useUserStore()
const userCardStore = useUserCardStore()
const addressStore = useAddressStore()
const cartStore = useCartStore()
const toRegister = () => {
	isRegister.value = !isRegister.value
	formData.value.acconut = ''
	formData.value.password = ''
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
			success: async (result) => {
				if(result.data.status === '200') {
					const {data: res} = result
					userStore.setUserInfo(res.data)
					uni.showToast({
						icon: 'success',
						title: '登录成功'
					})	
					await Promise.all([cartStore.getCartList(),userCardStore.getUserCardInfo(res.data.user_id),addressStore.getAddresList()])
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
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #f2f2f2;
	}
	.login-box {
		height: 100%;
		padding: 0 40rpx;
		.body {
			height: 100%;
			.content {
				margin-top: 80rpx;
				.img-logo {
					text-align: center;
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
						.login-form {
							padding: 0 80rpx;
							.username,.password {
								padding: 6rpx 0;
								border-bottom: 1px solid #ccc;
								margin-bottom: 32rpx;
							}
							.icon-profile,.icon-Password {
								margin-right: 16rpx;
								font-size: 42rpx;
							}
							.icon-clear_circle {
								margin-right: 6rpx;
								font-size: 24rpx;
								color: #ccc;
							}
							.name-input,.password-input {
								flex: 1;
							}
							.not-reg {
								justify-content: space-between;
								font-size: 12px;
								.item {
									padding: 10rpx 20rpx;
								}
							}
							.agree {
								margin: 60rpx 0 40rpx;
								font-size: 26rpx;
							}
							.submit-block {
								.btn-login-reg {
									color: #fff;
									border-radius: 48rpx;
									background-color: #CC9756;
								}
							}
						}
					}
				}
			}
		}
	}

</style>

<template>
	<van-popup
	  :show="show"
	  position="bottom"
	  custom-style="height: 50%;"
	  @close="onCancel"
	>
		<view class="box flex-c">
			<view class="password-block flex-c">
				<view class="popup-top flex-a">
					<view class="cancel-left" @tap="onCancel">
						取消
					</view>
					<view class="forget-right">
						忘记密码?
					</view>
				</view>
				<view class="popup-bd flex-c">
					<view class="title">
						输入支付密码
					</view>
					<view class="input-block flex">
						<view class="input-item flex-a" v-for="i in 6" :key="i" @tap="onTapInputItem">
							<view class="item-value">
								{{password[i - 1]}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="keyboard flex-c" v-show="focus">
				<view class="close flex" @tap="onCloseBoard">
					<van-icon name="arrow-down" size="24rpx"></van-icon>
				</view>
				<view class="item-block flex">
					<view class="key-item" v-for="i in 9" :key="i" @tap="onValueChange(i)">
						{{i}}
					</view>
					<view class="key-item none">
						
					</view>
					<view class="key-item zero" @tap="onValueChange(0)">
						0
					</view>
					<view class="key-item delete" @tap="onDeleteVal">
						<van-icon name="cross" size="24rpx" />
					</view>
				</view>
			</view>
		</view>
	</van-popup>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import {verifyPasswordAPI} from '../../api/user.js'
const props = defineProps(['show','is_verify'])
const emits = defineEmits(['update:show','update:is_verify'])

const password = ref([])
const focus = ref(true)

watchEffect(() => {
	if(password.value.length == 6) {
		//校验密码
		verifyPassword()
	}
})
//校验密码
const verifyPassword = async () => {
	uni.showLoading({ mask: true })
	const res = await verifyPasswordAPI(password.value.join(''))
	if(res) uni.hideLoading()
	if(res.code == 200) {
		onCancel()
		emits('update:is_verify', true)
	} else {
		uni.showToast({
			title: '密码错误',
			icon: 'error'
		})
		password.value = []
	}
}
//关闭popup
const onCancel = () => {
	password.value = []
	emits('update:show', false)
}
//点击聚焦
const onTapInputItem = () => {
	focus.value = true
}

const onValueChange = (val) => {
	if(password.value.length >= 6) return
	password.value.push(val)
}

const onDeleteVal = () => {
	password.value.pop()
}
const onCloseBoard = () => {
	focus.value = false
}

</script>

<style lang="scss" scoped>
.box {
	height: 100%;
	.password-block {
		padding: 0 20rpx;
		box-sizing: border-box;
		.popup-top {
			padding: 20rpx 0 12rpx;
			justify-content: space-between;
			font-size: 12px;
			.forget-right {
				color: #7d7d7d;
			}
		}
		.popup-bd {
			box-sizing: border-box;
			.title {
				padding: 20rpx 0;
				text-align: center;
				font-size: 14px;
			}
			.input-block {
				width: 100%;
				padding: 12rpx 0;
				border: 1px solid #cecece;
				.input-item {
					flex: 1;
					justify-content: center;
					height: 52rpx;
					border-right: 1px solid #cecece;
					&:last-child {
						border: 0;
					}
				}
			}
		}
	}
	.keyboard {
		flex: 1;
		// background-color: #181818;
		.close {
			justify-content: center;
			padding: 12rpx 0;
		}
		.item-block {
			flex: 1;
			flex-wrap: wrap;
			.key-item {
				width: 33vw;
				// height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-top: 1px solid #232323;
				border-right: 1px solid #232323;
				&:nth-child(3n) {
					border-right: 0;
				}
			}
			.none {
				// background-color: #111;
			}
			.delete {
				border-right: 0;			}
		}
	}
}
</style>
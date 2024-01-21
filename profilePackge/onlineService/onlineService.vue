<template>
	<view class="online-service-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'在线客服'"></CustomHeader>
		<view class="online-server-body flex-c">
			<view class="sign">
				<text class="name">网易严选</text>
			</view>
			<scroll-view scroll-y="true" class="communicate-block">
				<view class="communicate">
					<block v-if="chatInfo.length">
						<view class="message-block flex" :class="{message_block_right: item.send_id == sendId}" v-for="(item,index) in chatInfo" :key="index">
							<image v-if="item.send_id == receiverId" src="http://127.0.0.1:3000/upload/QIwNRdjgjNSU0f93370b9ab43a78e6a00cbd791d4b7a.jpg" class="user-avator"></image>
							<image v-else :src="userStore.userInfo.avator" class="user-avator"></image>
							<view class="message" :class="{message_left: item.send_id == receiverId, message_right: item.send_id == sendId}">
								<van-icon v-if="item.send_id == receiverId" size="32rpx" class="before-icon" name="arrow-left" />
								{{item.message}}
							</view>
						</view>
					</block>
<!-- 					<view class="first-message">
						hello!您的客服小优为您服务
					</view> -->
				</view>
			</scroll-view>
		</view>
		<view class="send-message flex">
			<input class="send-input" type="text" v-model="userMessage">
			<view class="send-btn" @tap="onSendMessage">
				发送
			</view>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import { ref } from 'vue'
import {getUserChatRecordAPI} from '../../api/chat.js'
import {useUserStore} from '../../store/useUserStore.js'
const userStore = useUserStore()

//固定接收信息人id
const receiverId = ref(1001)
const sendId = userStore.userInfo.socket_id

const {safeAreaInsets} = uni.getSystemInfoSync()

let socketTask = uni.connectSocket({
	url: `ws://localhost:3001?socket=${sendId}`, //仅为示例，并非真实接口地址。
	complete: ()=> {}
})



const chatInfo = ref([])
const getChatHistory = async () => {
	const res = await getUserChatRecordAPI(receiverId.value,userStore.userInfo.socket_id)
	chatInfo.value = res.result
}



//用户输入数据
const userMessage = ref('')
const onSendMessage = () => {
	if(userMessage.value == '') return uni.showToast({ icon: 'error', title: '输入不能为空哦' })
	const now = new Date()
	const message = {message: userMessage.value, send_id: sendId, chat_time: now.getTime(), receiver_id: receiverId.value}
	chatInfo.value.push(message)
	const jsonMessage = JSON.stringify(message)
	socketTask.send({data: jsonMessage })
	userMessage.value = ''
}

//接受服务端传递的消息
socketTask.onMessage((e) => {
	const msg = JSON.parse(e.data)
	chatInfo.value.push(msg)
})

onLoad(() => {
	getChatHistory()
})
</script>


<style lang="scss">
.online-service-block {
	height: 100vh;
	box-sizing: border-box;
	.online-server-body {
		flex: 1;
		.sign {
			height: 106rpx;
			background-color: #aa2c2a;
			.name {
				display: block;
				line-height: 106rpx;
				margin-left: 42rpx;
				font-size: 15px;
				color: #fff;
			}
		}
		.communicate-block {
			flex: 1;
			.communicate {
				height: 100%;
				padding: 50rpx 40rpx 0;
				box-sizing: border-box;
				.first-message {
					width: 406rpx;
					height: 50rpx;
					line-height: 50rpx;
					margin: 0rpx auto 40rpx;
					border-radius: 26rpx;
					background-color: #cbcbcb;
					color: #fff;
					font-size: 12px;
					text-align: center;
				}
				.message-block {
					margin-bottom: 40rpx;
					.user-avator {
						flex-shrink: 0;
						width: 82rpx;
						height: 82rpx;
						border-radius: 50%;
					}
					.message {
						position: relative;
						line-height: 44rpx;
						padding: 28rpx 24rpx 32rpx;
						margin-left: 30rpx;
						border: 1px solid #dadada;
						border-radius: 16rpx;
						font-size: 13px;
						.before-icon {
							position: absolute;
							left: -24rpx;
							top: 32rpx;
							color: #dadada;
						}
					}
					.message_left::before {
						content: '';
						position: absolute;
						left: -2rpx;
						top: 36rpx;
						width: 1px;
						height: 24rpx;
						background-color: #fff;
					}
					.message_right {
						background-color: #aa2c2a;
						border-color: #7a4242;
						color: #fff;
						margin: 0 30rpx 0 0;
						&::after {
							content: '';
							position: absolute;
							top: 30rpx;
							right: -16rpx;
							width: 0;
							height: 0;
							border-top: 18rpx solid transparent;
							border-bottom: 18rpx solid transparent;
							border-left: 18rpx solid #aa2c2a;
						}
					}
				}
				.message_block_right {
					flex-flow: row-reverse;
				}
			}
		}
	}
	.send-message {
		width: 100vw;
		height: 110rpx;
		padding: 16rpx 18rpx 22rpx;
		background-color: #f1f6f7;
		border: 1px solid #cbd7d4;
		box-sizing: border-box;
		.send-input {
			flex: 1;
			height: 64rpx;
			line-height: 64rpx;
			padding-left: 20rpx;
			border: 1px solid #cfd6db;
			border-radius: 6rpx;
			box-sizing: border-box;
			font-size: 12px;
		}
		.send-btn {
			width: 118rpx;
			height: 68rpx;
			line-height: 68rpx;
			margin-left: 18rpx;
			background-color: #c67d7f;
			color: #f8fdf2;
			font-size: 13px;
			text-align: center;
			border-radius: 6rpx;
		}
	}
}
</style>

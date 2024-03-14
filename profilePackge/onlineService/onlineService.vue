<template>
	<view class="online-service-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<view class="header">
			<CustomHeader :title="'在线客服'"></CustomHeader>
			<view class="sign">
				<text class="name">网易严选</text>
			</view>
		</view>
		<scroll-view scroll-y="true" class="online-server-body">
			<view class="communicate-block">
				<view class="communicate">
					<block v-if="chatInfo.length">
						<view class="message-block flex" :class="{message_block_right: item.send_id == sendId}" v-for="(item,index) in chatInfo" :key="index">
							<image v-if="item.send_id == receiverId" src="http://127.0.0.1:3000/upload/QIwNRdjgjNSU0f93370b9ab43a78e6a00cbd791d4b7a.jpg" class="user-avator"></image>
							<image v-else :src="userStore.userInfo.avator" class="user-avator"></image>
							<view class="message" :class="{message_left: item.send_id == receiverId, message_right: item.send_id == sendId}">
								<i class="iconfont icon-left" v-if="item.send_id == receiverId"></i>
								{{item.message}}
							</view>
						</view>
					</block>
<!-- 					<view class="first-message">
						hello!您的客服小优为您服务
					</view>
					<view class="first-message">
						hello!您的客服小优为您服务
					</view>
					<view class="first-message">
						hello!您的客服小优为您服务
					</view> -->
				</view>
			</view>
		</scroll-view>
		<view class="send-message flex">
			<input class="send-input" type="text" v-model="userMessage">
			<view class="send-btn" @tap="onSendMessage">
				发送
			</view>
		</view>
	</view>
</template>

<script setup>
import {onLoad, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'
import {getUserChatRecordAPI, insertUserChatAPI} from '../../api/chat.js'
import {useUserStore} from '../../store/useUserStore.js'
const userStore = useUserStore()

//固定接收信息人id
const receiverId = ref(1001)
const sendId = userStore.userInfo.socket_id

const agentStatus = ref(false) //客服在线状态

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
const onSendMessage = async () => {
	if(userMessage.value == '') return uni.showToast({ icon: 'error', title: '输入不能为空哦' })
	const now = new Date()
	const message = {message: userMessage.value, send_id: sendId, chat_time: now.getTime(), receiver_id: receiverId.value, is_read: 0}
	if(agentStatus.value) { 
		//客服在线时，通过socket传送数据，并且上传到服务器
		message.is_read = 1
		const jsonMessage = JSON.stringify(message)
		socketTask.send({data: jsonMessage })
	}
	//不在线则不通过socket，直接传服务器
	const res = await insertUserChatAPI(message)
	chatInfo.value.push(message)
	
	
	userMessage.value = ''
}

//接受服务端传递的消息
socketTask.onMessage((e) => {
	const msg = JSON.parse(e.data)
	//判断客服是否在线
	if(msg.type == 'online') {
		agentStatus.value = msg.online
	} else {
		chatInfo.value.push(msg)
	}
})


onLoad(() => {
	getChatHistory()
})

onUnload(() => {
	socketTask.close()
})
</script>


<style lang="scss">
page {
	height: 100vh;
}
.online-service-block {
	height: 100%;
	box-sizing: border-box;
	.header {
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
	}
	.online-server-body {
		flex: 1;
		overflow: scroll;
		.communicate-block {
			.communicate {
				height: 100%;
				padding: 50rpx 40rpx 10rpx;
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
						.icon-left {
							position: absolute;
							left: -24rpx;
							top: 32rpx;
							color: #dadada;
							font-size: 36rpx;
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

<template>
	<view class="add-edit-block" :style="{paddingTop: `${safeAreaInsets.top}px`}">
		<CustomHeader :title="type == 1 ? '新增地址' : '编辑地址'"></CustomHeader>
		<view class="add-edit-bd">
			<view class="receiver-detail">
				<form ref="form" modelValue="formData">
					<view class="form-item">
						<view class="item-lable">
							收货人
						</view>
						<view class="item-input">
							<input type="text" placeholder="请填写收货人姓名" v-model="formData.name">
						</view>
					</view>
					<view class="form-item">
						<view class="item-lable">
							联系方式
						</view>
						<view class="item-input">
							<view class="select-phone flex-a">
								<text>+86</text>
								<uni-icons type="bottom" size="12" color="#696969"></uni-icons>
							</view>
							<input type="text" placeholder="请填写收货人姓名" v-model="formData.contact">
						</view>
					</view>
					<view class="form-item">
						<view class="item-lable">
							所在地区
						</view>
						<view class="item-input">
							<text v-if="formData.adress">{{formData.adress}}</text>
							<text v-else>获取您的地址</text>
						</view>
						<view class="location">
							<i class="iconfont icon-dingwei" @tap="handleQQMap"></i>
						</view>
					</view>
					<view class="form-item">
						<view class="item-lable">
							详细地址
						</view>
						<view class="item-input">
							<input type="text" placeholder="请填写收货人姓名" v-model="formData.detail_adrs">
						</view>
					</view>
				</form>
			</view>
			<view class="adress-lable">
				<view class="lable-block flex-a">
					<view class="lable">
						标签
					</view>
					<view class="lable-item-block flex">
						<view class="lable-item flex-c-a" :class="{active: i.selected}" v-for="i in tags" :key="i.name" @tap="onSelectTag(i)" >
							{{i.name}}
						</view>
						<view class="lable-item flex-c-a plus" @tap="handleAddTag">
							+	
						</view>
					</view>
				</view>
				<view class="smart-adress flex-c">
					<view class="smart-title">
						智能识别地址:
					</view>
					<view class="smart-item-block">
						粘贴整段文字如:北京市大兴区科创十一街京东集团总部,吴祖扬,15588480581
					</view>
				</view>
				<view class="set-default flex">
					<view class="default-text flex-c">
						<view class="big-text">
							设置默认地址
						</view>
						<view class="alert-text">
							提醒:每次下单会默认推荐使用该地址
						</view>
					</view>
					<view class="default-btn flex-a">
						 <van-switch :checked="isDefault" active-color="#f8611b" size="24px" @change="checkChange" />
					</view>
				</view>
			</view>
			<view class="submit-block" @tap="submitTap">
				<button class="btn-submit">确定</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, watchEffect } from "vue"
import {onLoad,onReady} from '@dcloudio/uni-app'
import {useAddressStore} from '../../store/useAddressStore.js'
const QQMapWX = require('../../static/TencentMap/qqmap-wx-jssdk.js')
// import QQMapWX from '../../static/TencentMap/qqmap-wx-jssdk.js'
const addressStore = useAddressStore()
const {safeAreaInsets} = uni.getSystemInfoSync()
const tags = ref([
	{ name: '家', selected: false },
	{ name: '学校', selected: false },
	{ name: '公司', selected: false },
])
const type = ref('1')
const addresId = ref(0)
const isDefault =  ref(false)
const formData = ref({
	name: '',
	contact: '',
	adress: '',
	detail_adrs: '',
	tag: ''
})

watchEffect(() => {
	
})

const checkChange = (e) => {
	isDefault.value = e.detail
}
//用户添加自定义标签
const handleAddTag = () => {
	
}
//用户点击选择标签
const onSelectTag = (item) => {
	tags.value.forEach(i => {
		i.selected = false
		if(i.name == item.name) i.selected = true
	})
	formData.value.tag = item.name
}

const submitTap = () => {
	for(let key in formData.value) {
		if(formData.value[key] == "") {
			uni.showToast({
				icon: 'error',
				title: '请填写完整信息'
			})
			return 
		}
	}
	type.value == '1' ? addressStore.addUserAddress(Object.assign(formData.value,{isDefault: isDefault.value})) 
	: addressStore.updateAddress(Object.assign(formData.value, {isDefault: isDefault.value, id: addresId.value}))
	setTimeout(() => uni.navigateBack(), 500)
}


//初始化腾讯位置map
let qqmapsdk
const initTencentMap = () => {
	qqmapsdk = new QQMapWX({
		key: 'AQABZ-EIAWB-CLAUP-NI3BT-Z4XT2-VPFDK'
	})
}

const handleQQMap = () => {
	uni.chooseLocation({
		success: (data) => {
			//逆解析地址
			qqmapsdk.reverseGeocoder({
				location: {
					latitude: data.latitude,
					longitude: data.longitude
				},
				success: (res) => {
					formData.value.adress = res.result.address
				}
			})
		}
	})
}

onLoad((option) => {
	type.value = option.type
	if(option.id) {
		const item = addressStore.addressList.find(item => item.addres_id == option.id)
		formData.value.id = option.id
		formData.value.name = item.name
		formData.value.contact = item.contact
		formData.value.adress = item.address
		formData.value.detail_adrs = item.detail_adrs
	}
	initTencentMap()
})
</script>



<style lang="scss">
page {
	height: 100%;
}
.add-edit-block {
	height: 100%;
	box-sizing: border-box;
	.add-edit-bd {
		padding: 20rpx 20rpx 0;
		.receiver-detail {
			.form-item {
				display: flex;
				align-items: center;
				padding-bottom: 36rpx;
				margin-top: 20rpx;
				border-bottom: 1px solid #b8b8b8;
				.item-lable {
					width: 124rpx;
					font-size: 15px;
				}
				.item-input {
					display: flex;
					margin-left: 50rpx;
					font-size: 13px;
					.select-phone {
						margin-right: 10rpx;
						color: #696969;
					}
				}
				.location {
					margin:  0 30rpx 0 auto;
					.icon-dingwei {
						font-size: 32rpx;
					}
				}
			}
		}
		.adress-lable {
			margin-top: 20rpx;
			.lable-block {
				padding: 20rpx;
				.lable {
					margin-right: 80rpx;
					font-size: 13px;
				}
				.lable-item-block {
					flex-wrap: wrap;
					width: 440rpx;
					.lable-item {
						width: 112rpx;
						padding: 4rpx 0;
						margin: 0 20rpx 20rpx 0;
						font-size: 13px;
						border: 1px solid #c8c8c8;
						border-radius: 40rpx;
						&.active {
							color: #fff;
							background-color: #CC9756;
						}
					}
				}
			}
			.smart-adress {
				margin: 20rpx 0 40rpx;
				.smart-title {
					font-size: 14px;
					font-weight: 500;
				}
				.smart-item-block {
					margin-top: 16rpx;
					padding: 20rpx 40rpx 20rpx 20rpx;
					font-size: 13px;
					color: #c7c7c7;
					background-color: #f1f1f1;
				}
			}
			.set-default {
				justify-content: space-between;
				.default-text {
					.big-text {}
					.alert-text {
						margin-top: 10rpx;
						font-size: 12px;
						color: #c7c7c7;
					}
				}
				.default-btn {
					justify-content: center;
				}
			}
		}
		.submit-block {
			margin-top: 30rpx;
			.btn-submit {
				border-radius: 40rpx;
				background: linear-gradient(to right,#fa2f19,#f8611b);
				color: #fff;
				font-size: 15px;
			}
		}
	}
}
</style>

<template>
	<view class="add-edit-header" :style="{paddingTop: top + 'px'}">
		<van-icon name="arrow-left" size="36rpx" class="header-left" @tap="toBack"></van-icon>
		<view class="edit-add-title">
			{{type == '1' ? '新增地址' : '编辑地址'}}
		</view>
	</view>
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
						<view class="select-phone">
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
					<view class="item-input" @tap="onCloseOpen('open')">
						<text v-if="fieldValue">{{fieldValue}}</text>
						<text v-else>省份城市区县</text>
					</view>
				</view>
				<view class="form-item">
					<view class="item-lable">
						详细地址
					</view>
					<view class="item-input">
						<input type="text" placeholder="请填写收货人姓名" v-model="formData.adress">
					</view>
				</view>
			</form>
		</view>
		<view class="adress-lable">
			<view class="lable-block">
				<view class="lable">
					标签
				</view>
				<view class="lable-item-block">
					<view class="lable-item" v-for="i in 3" :key="i" >
						学校
					</view>
					<view class="lable-item plus">
						+	
					</view>
				</view>
			</view>
			<view class="smart-adress">
				<view class="smart-title">
					智能识别地址:
				</view>
				<view class="smart-item-block">
					粘贴整段文字如:北京市大兴区科创十一街京东集团总部,吴祖扬,15588480581
				</view>
			</view>
			<view class="set-default">
				<view class="default-text">
					<view class="big-text">
						设置默认地址
					</view>
					<view class="alert-text">
						提醒:每次下单会默认推荐使用该地址
					</view>
				</view>
				<view class="default-btn flex-a">
					 <van-switch :checked="checked" size="24px" />
				</view>
			</view>
		</view>
		<view class="submit-block" @tap="submitTap">
			<button class="btn-submit">确定</button>
		</view>
		<van-popup :show="show" position="bottom">
			<van-cascader
			  v-if="show"
			  swipeable
			  :value="cascaderVal"
			  title="地址"
			  :options="options"
			  active-color="#ee0a24"
			  @close="onCloseOpen"
			  @finish="onFinish"
			/>
		</van-popup>
	</view>
</template>

<script setup>
import { ref } from "vue"
import {onLoad} from '@dcloudio/uni-app'
import {useMiddle} from '../../hooks/useMiddle.js'
import {getRegionAPI} from '../../api/address.js'
import {useAddressStore} from '../../store/useAddressStore.js'
const addressStore = useAddressStore()
const top = ref(0)
const type = ref('1')
const formData = ref({
	name: '',
	contact: '',
	adress: ''
})
const cascaderVal = ref(0)
const options = ref([])
const show = ref(false)
const ids = ref([])
const checked = ref(false)
const checkChange = (e) => {
	checked.value = e.detail
}
const toBack = () => {
	uni.navigateBack()
}
const onCloseOpen = (type = 'close') => {
	type == 'open' ? show.value = true : show.value = false
}
const fieldValue = ref('')
const onFinish = (e) => {
	const { selectedOptions, value } = e.detail;
	selectedOptions.forEach(item => ids.value.push(item.value))
	fieldValue.value = selectedOptions.map((option) => option.text || option.name).join(' ');
	cascaderVal.value = value
	if(e.type === 'finish') {
		show.value = false
	}
}

const submitTap = () => {
	for(let key in formData.value) {
		if(formData.value[key] == "" || ids.value.length == 0) {
			uni.showToast({
				icon: 'error',
				title: '请填写完整信息'
			})
			return 
		}
	}
	console.log(formData.value);
	console.log(ids.value);
	if(type.value == '1') {
		addAddressAPI()
	} else {
		updateAddressAPI(formData.value,ids.value,checked.value)
	}
}

const getRegionList = async () => {
	const res = await getRegionAPI()
	options.value = res
}

onLoad((option) => {
	type.value = option.type
	useMiddle('.edit-add-title').then(data => top.value = data.top)
	getRegionList()
})
</script>

<style lang="scss">
page {
	height: 100%;
	overflow: hidden;
}
.add-edit-header {
	display: flex;
	overflow: hidden;
	.header-left {
		margin-left: 12rpx;
	}
	.edit-add-title {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
}
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
					display: flex;
					align-items: center;
					margin-right: 10rpx;
					color: #696969;
				}
			}
		}
	}
	.adress-lable {
		margin-top: 20rpx;
		.lable-block {
			display: flex;
			align-items: center;
			padding: 20rpx;
			.lable {
				margin-right: 80rpx;
				font-size: 13px;
			}
			.lable-item-block {
				display: flex;
				flex-wrap: wrap;
				width: 440rpx;
				.lable-item {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 112rpx;
					padding: 4rpx 0;
					margin: 0 20rpx 20rpx 0;
					font-size: 13px;
					border: 1px solid #c8c8c8;
					border-radius: 40rpx;
				}
			}
		}
		.smart-adress {
			display: flex;
			flex-direction: column;
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
			display: flex;
			justify-content: space-between;
			.default-text {
				display: flex;
				flex-direction: column;
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
</style>

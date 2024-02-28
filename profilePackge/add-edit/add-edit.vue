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
							<text v-else>请输入省份城市区县</text>
						</view>
						<view class="location">
							
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
						 <van-switch :checked="checked" active-color="#f8611b" size="24px" @change="checkChange" />
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
				  @change="onChange"
				/>
			</van-popup>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue"
import {onLoad,onReady} from '@dcloudio/uni-app'
import {middle} from '../../hooks/useMiddle.js'
import {getRegionAPI} from '../../api/address.js'
import {useAddressStore} from '../../store/useAddressStore.js'
const addressStore = useAddressStore()
const {safeAreaInsets} = uni.getSystemInfoSync()
const top = ref(0)
const type = ref('1')
const formData = ref({
	name: '',
	contact: '',
	adress: '',
	detail_adrs: ''
})
const options = ref([])
const cascaderVal = ref(0)
const show = ref(false)
const ids = ref([])
const checked = ref(false)
const checkChange = (e) => {
	checked.value = e.detail
}

function addChildren(option, children, id) {
	options.value.forEach(item => {
		if(item.value == id) {
			item.children = children
		}
	})
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

const onChange = (e) => {
	const { value, tabIndex, selectedOptions } = e.detail
	valueId.value = value
	getRegionAPI(valueId.value).then(res => {
		addChildren(selectedOptions, res.result, value)
	})
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

const valueId = ref(1) 
const getRegionList = async () => {
	const res = await getRegionAPI(valueId.value)
	res.result.forEach(item => {
		options.value.push({
			text: item.text,
			value: item.value,
			children: item.children || null
		})
	})
}

onReady(() => {
	middle('.edit-add-title').then(data => top.value = data.top)
})

onLoad((option) => {
	type.value = option.type
	if(option.id) {
		const item = addressStore.addressList.find(item => item.addres_id == option.id)
		formData.value.name = item.name
		formData.value.contact = item.contact
		formData.value.adress = item.address
		formData.value.detail_adrs = item.detail_adrs
	}
	getRegionList(valueId.value)
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
}
</style>

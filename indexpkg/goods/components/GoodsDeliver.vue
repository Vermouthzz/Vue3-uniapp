<template>
	<view class="deliver common-block">
		<view class="goods-select-item flex-a deliver-item" @tap="onShowPopup">
			<view class="item-left flex-a">
				<text class="item-left-conmmon">已选</text>
				<text class="select-sku">{{!selectName ? '请选择规格': selectName}}</text>
			</view>
			<view class="item-right">
				>
			</view>
		</view>
	</view>
	<view class="deliver" @tap="onShowAddress">
		<view class="goods-select-item flex-a deliver-item">
			<view class="item-left flex-a">
				<text class="item-left-conmmon">配送</text>
				<text class="select-sku">{{selectedAddres}}</text>
			</view>
			<view class="item-right">
				>
			</view>
		</view>
	</view>
	<view class="deliver">
		<view class="goods-select-item flex-a deliver-item">
			<view class="item-left flex-a">
				<text>不支持无忧退还</text>
				<text>不可用券/红包</text>
				<text>不享受企业折扣</text>
			</view>
			<view class="item-right">
				>
			</view>
		</view>
	</view>
	<van-action-sheet :show="showAddress" title="配送至" @close="onShowAddress('close')" :round="false">
	  <scroll-view scroll-y="true" class="address-block" >
	  	<view class="address-item" v-for="item in addressStore.addressList" :key="item.addres_id">
	  		<van-checkbox @change="onChangeItem($event,item)" :value="item.selected">{{item.address.split(' ').join('')}}</van-checkbox>
	  	</view>
	  </scroll-view>
	</van-action-sheet>
</template>

<script setup>
import {computed, ref} from 'vue'
import mitter from '../../../utils/mitt.js'
import {useAddressStore} from '../../../store/useAddressStore.js'
const addressStore = useAddressStore()
const props = defineProps(['show'])
const emits = defineEmits(['update:show'])
const selectName = ref('')
mitter.on('selectName',data => {
	selectName.value = data
})

const isShow = ref(false)
const onShowPopup = async () => {
	emits('update:show', true)
}

const showAddress = ref(false)
const onShowAddress = (type = 'open') => {
	type == 'close' ? showAddress.value = false : showAddress.value = true
}
const onChangeItem = (e,item) => {
	addressStore.tapAddress(item.addres_id,e.detail,'change')
}

const selectedAddres = computed(() => {
	return addressStore.storeAddress ? addressStore.storeAddress.address.split(' ').join('') : '请选择配送区域'
})
</script>

<style lang="scss">
	.deliver {
		border-bottom: 1px solid #ccc;
		background-color: #fff;
		&:last-child {
			border: none;
		}
	}
	.address-block {
		height: 40vh;
		padding-left: 20rpx;
		border-top: 1px solid #d7d7d7;
		.address-item {
			padding: 24rpx 0;
			border-bottom: 1px solid #d7d7d7;
		}
	}
</style>
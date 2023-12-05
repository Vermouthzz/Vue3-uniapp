import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {getAddressAPI,addAddressAPI,updateAddressListAPI,delAddressAPI, updateAddressItemAPI} from '../api/address.js'

export const useAddressStore = defineStore('address', () => {
	//----------state-------------
	const addressList = ref('')
	
	
	//----------getter-------------
	const selectedAddress = computed(() => addressList.value.find(item => item.is_selected == 1))   //选中的地址)
	const storeAddress = computed(() => addressList.value.find(item => item.selected))    //store中选中的地址
	
	//-----------action---------------
	const getAddresList = async () => {
		const res = await getAddressAPI()
		addressList.value = res
	}
	
	const updateAddress = async (obj) => {
		const res = await updateAddressItemAPI(obj)
		getAddresList()
	}
	
	const delAddress = async (id) => {
		const res = await delAddressAPI(id)
		getAddresList()
	}
	//单击选中地址，更新后端状态
	const onSelectedAddress = async (val,id) => {
		uni.showLoading({mask: true})
		const res = await updateAddressListAPI(val,id)
		getAddresList()
		if(res) uni.hideLoading()
	}
	//单击选中地址更新store里地址状态，不更新后端
	const tapAddress = (id, val = false, type = 'tap') => {
		addressList.value.forEach(item => item.selected = false)
		const item = addressList.value.find(i => i.addres_id == id)
		type == 'tap' ? item.selected = true : item.selected = val
	}
	return {
		addressList,
		getAddresList,
		delAddress,
		updateAddress,
		selectedAddress,
		onSelectedAddress,
		tapAddress,
		storeAddress,
	}
})
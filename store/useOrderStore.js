import { defineStore } from 'pinia'
import { ref } from 'vue'
import {getOrderItemAPI,getOrderListAPI,updateOrderItemStatusAPI,createOrderAPI} from '../api/order.js'

export const useOrderStore = defineStore('order', () => {
	//-------state---------
	const orderList = ref([])
	const orderItem = ref('')
	
	//----------getter------------
	
	//----------action--------
	const getOrderList = async () => {
		const res = await getOrderListAPI()
		orderList.value = res.data
		let nowTime = new Date()
		orderList.value.forEach(item => {
			let effectiveTime = new Date(item.effective_time)
			if(nowTime < effectiveTime) {
				item.remainTime = effectiveTime - nowTime
			} else {
				item.remainTime = 0
			}
		})
	}
	
	const getOrderItem = async (id) => {
		const res = await getOrderItemAPI(id)
		orderItem.value = res.list
		let nowTime = new Date()
		orderItem.value.remainTime = new Date(orderItem.value.effective_time) - nowTime
	}
	
	const updateItem = async (type,id) => {
		if(orderItem.value) orderItem.order_status = type
		uni.showLoading({ mask: true })
		const res = await updateOrderItemStatusAPI(type,id)
		if(res) uni.hideLoading()
	}
	
	const createOrderItem = async (cart,addres,fee,num) => {
		const res = await createOrderAPI(cart,addres,fee,num)
		const id = res.data.id
		getOrderItem(id)
		return true
	}
	
	return {
		orderList,
		orderItem,
		getOrderItem,
		getOrderList,
		updateItem,
		createOrderItem
	}
})
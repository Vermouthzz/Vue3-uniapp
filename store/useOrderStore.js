import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {useUserCardStore} from './useUserCardStore.js'
import {getOrderItemAPI,updateOrderItemStatusAPI,createOrderAPI} from '../api/order.js'
import {useRemainTime} from '../hooks/useRemainTime.js'

export const useOrderStore = defineStore('order', () => {
	//-------state---------
	const orderItem = ref('')
	const userCardStore = useUserCardStore()
	//----------getter------------
	
	
	//----------action--------

	async function updateOrderStatus(type,id) {
		uni.showLoading({ mask: true })
		const res = await updateOrderItemStatusAPI(type, id)
		if (res) uni.hideLoading()
	}
	
	//创建订单
	const createOrderItem = async (cart,addres,fee,num,total,li_num) => {
		const res = await createOrderAPI(cart,addres,fee,num,total,li_num)
		const id = res.data.id
		getOrderItem(id)
		return id
	}
	
	//获取订单Item
	const getOrderItem = async (id) => {
		const res = await getOrderItemAPI(id)
		orderItem.value = {
			...res.list,
			remainTime: useRemainTime(res.list)
		}
		console.log(orderItem.value);
	}
	
	//更新订单item状态
	const updateItem = async (type,id) => {
		if(orderItem.value) orderItem.value.order_status = type
		await updateOrderStatus(type, id)
	}

	//取消订单,更新orderItem状态
	const onCancelOrderItem = async (order_id) => {
		if(userCardStore.userCard[0].checked) {
			await Promise.all([updateItem(-1,order_id),userCardStore.updateCardNum(order_id,-1,0)])
		} else {
			await updateItem(-1,order_id)
		}
	}
	
	return {
		orderItem,
		getOrderItem,
		updateItem,
		createOrderItem,
		onCancelOrderItem
	}
})
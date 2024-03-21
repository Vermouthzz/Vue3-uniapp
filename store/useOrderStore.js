import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {useUserCardStore} from './useUserCardStore.js'
import {useTicketStore} from './useTicketStore.js'
import {getOrderItemAPI,updateOrderItemStatusAPI} from '../api/order.js'
import {useRemainTime} from '../hooks/useRemainTime.js'

export const useOrderStore = defineStore('order', () => {
	//-------state---------
	const orderItem = ref('')
	const userCardStore = useUserCardStore()
	const ticketStore = useTicketStore()
	//----------getter------------
	
	
	//----------action--------

	async function updateOrderStatus(type,id, real_pay) {
		uni.showLoading({ mask: true })
		const res = await updateOrderItemStatusAPI(type, id, real_pay)
		if (res) uni.hideLoading()
	}
	
	
	//获取订单Item
	const getOrderItem = async (id) => {
		const res = await getOrderItemAPI(id)
		orderItem.value = {
			...res.list,
			remainTime: useRemainTime(res.list)
		}
	}
	
	
	//更新订单item状态
	const updateItem = async (type,id, real_pay) => {
		if(orderItem.value) orderItem.value.order_status = type
		await updateOrderStatus(type, id ,real_pay)
		userCardStore.getUserCardInfo()
		ticketStore.getTicketList()
	}

	//取消订单,更新orderItem状态
	const onCancelOrderItem = async (order_id) => {
		await updateItem(-1,order_id, 0)
	}
	
	return {
		orderItem,
		getOrderItem,
		updateItem,
		onCancelOrderItem,
	}
})
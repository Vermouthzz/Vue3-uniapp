import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {useUserCardStore} from './useUserCardStore.js'
import {getOrderItemAPI,getOrderListAPI,updateOrderItemStatusAPI,createOrderAPI} from '../api/order.js'

export const useOrderStore = defineStore('order', () => {
	//-------state---------
	const orderList = ref([])
	const orderItem = ref('')
	const userCardStore = useUserCardStore()
	//----------getter------------
	
	
	//----------action--------
	function calculateRemainingTime(item) {
		const nowTime = new Date()
		const effectiveTime = new Date(Number(item.effective_time))
		return nowTime < effectiveTime ? effectiveTime - nowTime : 0
	}
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
	
	//获取订单列表
	const getOrderList = async () => {
		const res = await getOrderListAPI()
		orderList.value = res.data.map(item => {
			return {
				...item,
				remainTime: calculateRemainingTime(item)
			}
		})
	}
	//获取订单Item
	const getOrderItem = async (id) => {
		const res = await getOrderItemAPI(id)
		orderItem.value = {
			...res.list,
			remainTime: calculateRemainingTime(res.list)
		}
	}
	
	//更新订单item状态
	const updateItem = async (type,id) => {
		if(orderItem.value) orderItem.value.order_status = type
		await updateOrderStatus(type, id)
	}
	//更新订单列表状态
	const updateOrderListItem = async (type, id) => {
		const item = orderList.value.find(item => item.order_id == id)
		if(item) {
			item.order_status = type
			await updateOrderStatus(type, id)
		}
	}

	//取消订单,更新orderItem状态
	const onCancelOrderItem = async (order_id) => {
		if(userCardStore.userCard[0].checked) {
			await Promise.all([updateItem(-1,order_id),userCardStore.updateCardNum(order_id,-1,0)])
		} else {
			await updateItem(-1,order_id)
		}
	}
	//取消订单，更新OrderListItem状态
	const onCancleOrderListItem = async (order_id) => {
		if(userCardStore.userCard[0].checked) {
			await Promise.all([updateOrderListItem(-1,order_id),userCardStore.updateCardNum(order_id,-1,0)])
		} else {
			await updateOrderListItem(-1,order_id)
		}
	}
	
	return {
		orderList,
		orderItem,
		getOrderItem,
		getOrderList,
		updateItem,
		updateOrderListItem,
		createOrderItem,
		onCancelOrderItem,
		onCancleOrderListItem
	}
})
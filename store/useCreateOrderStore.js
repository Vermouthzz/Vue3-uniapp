import { defineStore } from "pinia"
import { computed, ref } from 'vue'
import {getCreateOrderAPI, createOrderAPI} from '../api/order.js'

export const useCreateOrderStore = defineStore('create-order', () => {
	//创建订单列表
	const createOrderList = ref([])
	
	//获取
	const getCreateOrderInfo = async (id,count) => {
		createOrderList.value.length = 0
		const res = await getCreateOrderAPI(id)
		createOrderList.value.push(res.result)
		createOrderList.value[0].count = count
	}
	//获取购物车选中的商品	
	const getCreateOrderList = (arr) => {
		createOrderList.value.length = 0
		arr.forEach(item => createOrderList.value.push(...item))
	}
	
	//创建订单
	const createOrderItem = async (adress, ticket, li) => {
		const res = await createOrderAPI(createOrderList.value, adress, ticket, li, totalRetailPrice.value)
		return res.data.id
	}
	
	//商品红包限制ids
	const serviceIds = computed(() => createOrderList.value.map(item => item.sku_item.service_id))
	
	//商品原价总和
	const totalPrice = computed(() => createOrderList.value.reduce((pre,cur) => pre += cur.sku_item.price * cur.count, 0))
	//商品零售价总和
	const totalRetailPrice = computed(() => createOrderList.value.reduce((pre,cur) => pre += cur.sku_item.retail_price* cur.count, 0))
	const activeFee = computed(() => createOrderList.value.reduce((pre,cur) => pre += (cur.sku_item.price - cur.sku_item.retail_price) * cur.count, 0))
	return {
		createOrderList,
		getCreateOrderInfo,
		getCreateOrderList,
		totalPrice,
		totalRetailPrice,
		activeFee,
		serviceIds,
		createOrderItem
	}
})
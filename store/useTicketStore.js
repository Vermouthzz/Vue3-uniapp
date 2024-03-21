import { defineStore } from 'pinia'
import {ref, computed} from 'vue'
import {useCartStore} from './useCartStore.js'
import {getTicketListAPI, updateUserTicketAPI} from '../api/ticket.js'

export const useTicketStore = defineStore('ticket', () => {
	
	const cartStore = useCartStore()
	
	const userTicketList = ref([])
	
	//未使用的红包
	const noUseTicket = computed(() => userTicketList.value.filter(i => i.ticket_status == 0))
	//已使用的红包
	const hadUseTicket = computed(() => userTicketList.value.filter(i => i.ticket_status == 1))
	//已过期的红包
	const hadExpiredTicket = computed(() => userTicketList.value.filter(i => i.ticket_status == 2))
	
	const getTicketList = async () => {
		const res = await getTicketListAPI()
		userTicketList.value = res.result
		if(noUseTicket.value.length) userTicketList.value.forEach(item => item.selected = false)
	}
	
	//默认选中最优惠的红包
	const OptimalPrice = (price, ids, type = 'price') => {
		if(!noUseTicket.value.length) return 0
		const item = noUseTicket.value.filter(coupon => {
			return coupon.suit_goods.every(i => {
				return ids.every(subI => subI != i)
			})
		}).filter(i => i.ticket_condition <= price).reduce((a,b) => {
			if(b.ticket_price > a.ticket_price) {
				a.ticket_id = b.ticket_id
				a.ticket_price = b.ticket_price
			}
			return a
		},{ticket_id: -1,ticket_price: 0})
		if(item.ticket_id == -1) {
			//说明没找到可以使用的红包
			return item.ticket_price
		} else {
			//找到最优红包
			const sItem = noUseTicket.value.find(i => i.ticket_id == item.ticket_id)
			if(type == 'select') {
				sItem.selected = true
				return
			}
			return sItem.ticket_price
		}
	}

	
	//创建订单页初始默认选择最优红包

	
	//购物车页筛选最优红包价格
	// const optimalCart = (ids, totalPrice) => {
	// 	let tks = null, max = 0
	// 	noUseTicket.value.forEach(item => {
	// 		const flag = item.suit_goods.every(i => {
	// 			return ids.every(subI => subI != i)
	// 		})
	// 		if(flag) {
	// 			if(item.ticket_price > max) {
	// 				tks = item
	// 				max = item.ticket_price
	// 			}
	// 		}
	// 	})
	// 	return tks
	// }
	
	
	//使用红包逻辑
	const updateUseTicket = async (status) => {
		const id = selectedTicket.value.ticket_id
		const res = await updateUserTicketAPI(id, status)
		selectedTicket.value.ticket_status = status
	}
	
	// 单击切换红包
	const tapSelected = (val) => {
		userTicketList.value.forEach(item => {
			item.selected = false
			if(item.ticket_id === val.ticket_id) item.selected = true
		})
	}
	//不使用红包
	const unUseTicket = () => {
		noUseTicket.value.forEach(item => item.selected = false)
	}
	
	//展示选中的红包
	const selectedTicket = computed(() => noUseTicket.value.find(i => i.selected))

	
	return {
		userTicketList,
		selectedTicket,
		OptimalPrice,
		tapSelected,
		unUseTicket,
		getTicketList,
		noUseTicket,
		hadUseTicket,
		hadExpiredTicket,
	}
})
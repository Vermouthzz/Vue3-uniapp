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
	const defaultSelectedTicket = (price, service) => {
		if(!noUseTicket.value.length) return
		let priceCondition = noUseTicket.value.filter(i => i.ticket_condition <= price)
		let suitableCoupons = []
		if(Array.isArray(service)) {
			suitableCoupons = priceCondition.filter(coupon => {
			        return service.every(serviceItem => coupon.suit_goods.includes(serviceItem));
			    });
		} else {
			 suitableCoupons = priceCondition.filter(coupon => coupon.suit_goods.includes(service));
		}
		const item = suitableCoupons.reduce((a,b) => {
			if(b.ticket_price > a.ticket_price) {
				a.ticket_id = b.ticket_id
				a.ticket_price = b.ticket_price
			}
			return a
		},{ticket_id: 0,ticket_price: 0})
		const sItem = noUseTicket.value.find(i => i.ticket_id == item.ticket_id)
		return sItem
	}
	//选中红包的item
	const optimalTicket = (price,type = 'else', service) => {
		const item = defaultSelectedTicket(price, service)
		if(type == 'price') {
			if(!item) return 0
			return item.ticket_price
		} else if(type == 'selected') {
			item ? item.selected = true : ''
		} else {
			return item
		}
	}
	
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
		optimalTicket,
		tapSelected,
		unUseTicket,
		getTicketList,
		noUseTicket,
		hadUseTicket,
		hadExpiredTicket
	}
})
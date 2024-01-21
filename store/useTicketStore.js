import { defineStore } from 'pinia'
import {ref, computed} from 'vue'
import {useCartStore} from './useCartStore.js'
import {getTicketListAPI} from '../api/ticket.js'

export const useTicketStore = defineStore('ticket', () => {
	
	const cartStore = useCartStore()
	
	const userTicketList = ref([])
	
	const getTicketList = async () => {
		const res = await getTicketListAPI()
		userTicketList.value = res.result
		if(userTicketList.value.length) userTicketList.value.forEach(item => item.selected = false)
	}
	
	//默认选中最优惠的红包
	const defaultSelectedTicket = (price) => {
		if(!userTicketList.value.length) return
		let item = userTicketList.value.filter(i => i.ticket_condition <= price).reduce((a,b) => {
			if(b.ticket_price > a.ticket_price) {
				a.ticket_id = b.ticket_id
				a.ticket_price = b.ticket_price
			}
			return a
		},{ticket_id: 0,ticket_price: 0})
		const sItem = userTicketList.value.find(i => i.ticket_id == item.ticket_id)
		return sItem
	}
	//选中红包的item
	const optimalTicket = (price,type = 'else') => {
		const item = defaultSelectedTicket(price)
		if(type == 'price') {
			if(!item) return 0
			return item.ticket_price
		} else if(type == 'selected') {
			item ? item.selected = true : ''
		} else {
			return item
		}
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
		userTicketList.value.forEach(item => item.selected = false)
	}
	
	
	//展示选中的红包
	const selectedTicket = computed(() => userTicketList.value.find(i => i.selected))
	
	//选出所有能选的红包
	const effectiveTickets = computed(() => {
		return userTicketList.value.filter(item => item.ticket_condition < cartStore.allRetailPrice)
	})
	//选出所有无效红包
	const uselessTickets = computed(() => {
		return userTicketList.value.filter(item => item.ticket_condition > cartStore.allRetailPrice)
	})
	
	return {
		userTicketList,
		selectedTicket,
		optimalTicket,
		effectiveTickets,
		uselessTickets,
		tapSelected,
		unUseTicket,
		getTicketList
	}
})
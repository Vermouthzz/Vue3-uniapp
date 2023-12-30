import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {getUserInfoAPI} from '../api/user.js'
import {useCartStore} from './useCartStore.js'

export const useUserCardStore = defineStore('user-card', () => {
	const cartStore = useCartStore()
	
	const userTicketList = ref([])
	const userBalance = ref('')
	const userCard = ref([])
	
	const getUserCardInfo = async (id) => {
		const res = await getUserInfoAPI(id)
		userBalance.value = res.balance
		userTicketList.value = res.tickets
		userCard.value = res.card.map(item => Object.assign(item,{checked: false}))
		if(userTicketList.value.length) userTicketList.value.forEach(item => item.selected = false)
	}
	
	const postNewBalance = (val) => {
		userBalance.value.num = val
	}
	
	const onCheckedChange = (val,type) => {
		type == 'li' ? userCard.value[0].checked = val : userCard.value[1].checked = val
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
	//
	
	return {
		userBalance,
		userTicketList,
		userCard,
		getUserCardInfo,
		selectedTicket,
		optimalTicket,
		effectiveTickets,
		uselessTickets,
		tapSelected,
		unUseTicket,
		postNewBalance,
		onCheckedChange
	}
})
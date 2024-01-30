import { defineStore } from "pinia"
import { computed, ref } from "vue";
import {getUserInfoAPI} from '../api/user.js'
import {updateCardNumsAPI} from '../api/card.js'

export const useUserCardStore = defineStore('user-card', () => {
	
	const userBalance = ref('')
	const userCard = ref([])
	
	const formTime = (val) => {
		const time = new Date(Number(val))
		const formatDate = `${time.getFullYear()}.${(time.getMonth() + 1).toString().padStart(2,'0')}.${time.getDate().toString().padStart(2, '0')}`
		return formatDate
	}
	
	const getUserCardInfo = async (id) => {
		const res = await getUserInfoAPI(id)
		userBalance.value = res.balance
		userCard.value = res.card.map(item => {
			item.children?.forEach(i => {
					i.effective_time = formTime(i.effective_time)
			})
			return Object.assign(item,{checked: false})
		})
	}
	
	const postNewBalance = (val) => {
		userBalance.value = val
	}
	
	const onCheckedChange = (val,type) => {
		type == 'li' ? userCard.value[0].checked = val : userCard.value[1].checked = val
	}
	
	const updateCardNum = async (order_id,type,is_use) => {
		const res = await updateCardNumsAPI(order_id,type,is_use)
		getUserCardInfo()
	}
	
	return {
		userBalance,
		userCard,
		getUserCardInfo,
		postNewBalance,
		onCheckedChange,
		updateCardNum
	}
})
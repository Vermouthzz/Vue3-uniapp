import { defineStore } from "pinia"
import { computed, ref } from "vue";
import {getUserInfoAPI} from '../api/user.js'

export const useUserCardStore = defineStore('user-card', () => {
	
	const userBalance = ref('')
	const userCard = ref([])
	
	const getUserCardInfo = async (id) => {
		const res = await getUserInfoAPI(id)
		userBalance.value = res.balance
		userCard.value = res.card.map(item => Object.assign(item,{checked: false}))
	}
	
	const postNewBalance = (val) => {
		userBalance.value.num = val
	}
	
	const onCheckedChange = (val,type) => {
		type == 'li' ? userCard.value[0].checked = val : userCard.value[1].checked = val
	}
	
	return {
		userBalance,
		userCard,
		getUserCardInfo,
		postNewBalance,
		onCheckedChange
	}
})
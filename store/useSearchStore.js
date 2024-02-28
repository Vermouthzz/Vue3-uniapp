import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useSearchStore = defineStore('search', () => {
	const searchList = ref([])
	const searchData = ref([])
	
	const addSearchItem = (val) => {
		const index = searchList.value.findIndex(i => i == val)
		if(index != -1) {
			searchList.value.splice(index,1)
		}
		searchList.value.unshift(val)
		if(searchList.value.length == 11) searchList.value.pop()
	}
	
	const addSearchData = (val) => {
		searchData.value = val
	}
	
	const onDeleteHistory = () => {
		searchList.value = []
	}
	
	return {
		searchList,
		addSearchItem,
		onDeleteHistory
	}
},{
	persist: {
		storage: {
			setItem(key, value) {
				uni.setStorageSync(key, value)
			},		
			getItem(key) {
				return uni.getStorageSync(key)
			}
		}
	}
})
import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useSearchStore = defineStore('search', () => {
	const searchList = ref([])
	
	const addSearchItem = (val) => {
		const index = searchList.value.findIndex(i => i == val)
		if(index != -1) {
			searchList.value.splice(index,1)
		}
		searchList.value.unshift(val)
	}
	
	return {
		searchList,
		addSearchItem
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
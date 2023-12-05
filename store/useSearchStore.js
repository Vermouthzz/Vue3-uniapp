import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useSearchStore = defineStore('search', () => {
	const searchList = ref([])
	
	const addSearchItem = (val) => {
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
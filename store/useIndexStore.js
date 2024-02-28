import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useIndexStore = defineStore('index', () => {

	const searchData = ref([])
	
	const addSearchData = (val) => {
		searchData.value = val
	}
	
	return {
		searchData,
		addSearchData
	}
})
import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('userinfo', () => {
	const userInfo = ref('')
	
	//添加用户信息
	const setUserInfo = (data) => {
		userInfo.value = data
	}
	
	const clearUserInfo = () => {
		userInfo.value = null
	}
	return {
		userInfo,
		setUserInfo,
		clearUserInfo
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
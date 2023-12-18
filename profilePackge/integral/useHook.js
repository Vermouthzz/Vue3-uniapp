import { computed, ref } from "vue"


export const useGiftHook = () => {
	
	const randomList = computed(() => {
		let arr = [10, 30, 60]
		for(let i = 1; i < arr.length; i++) {
			const random = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[random]] = [arr[random], arr[i]];
		}
		return arr
	})
	
	return {
		randomList,
	}
}
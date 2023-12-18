import { computed } from "vue"

export const useTimeHook = (item) => {
	const DateFormat = (date) => {
		return date.split(' ')[0].split('/').join('.') + ' ' + date.split(' ')[1].substring(0,5)
	}
	
	const startEnd = computed(() => DateFormat(item.get_time) + '-' + DateFormat(item.out_time))
	const validTime = computed(() => {
		let time = new Date()
		return new Date(item.out_time).getTime() - time.getTime()
	})
	const surplusTime = computed(() => Math.ceil(validTime.value / (1000 * 60 * 60 * 24)))
	return {
		startEnd,
		validTime,
		surplusTime
	}
}
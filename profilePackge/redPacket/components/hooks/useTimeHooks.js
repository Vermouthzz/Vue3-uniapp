import { computed } from "vue"

export const useTimeHook = (item) => {
	const DateFormat = (date) => {
		const time = new Date(date * 1)
		const localTime = time.toLocaleString()
		const hours = time.getHours()
		const period = hours < 12 ? '上午' : '下午'
		const arr = localTime.split(period)
		return arr[0].split('/').join('.') + ' ' + arr[1].substring(0,5)
	}
	
	
	const startEnd = computed(() => DateFormat(item.get_time) + '-' + DateFormat(item.out_time))
	const validTime = computed(() => {
		let time = new Date()
		return item.out_time * 1 - time.getTime()
	})
	const surplusTime = computed(() => Math.ceil(validTime.value / (1000 * 60 * 60 * 24)))
	return {
		startEnd,
		validTime,
		surplusTime
	}
}

export const useRemainTime = (item) => {
	const nowTime = new Date()
	const effectiveTime = new Date(Number(item.effective_time))
	return nowTime < effectiveTime ? effectiveTime - nowTime : 0
}
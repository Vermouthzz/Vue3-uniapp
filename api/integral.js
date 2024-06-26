import http from '../request/index.js'

export const updateIntegralAPI = (type,count,sum,date,sign = 1) => {
	return http({
		url: '/integral',
		method: 'POST',
		data: {
			type,
			count,
			sum,
			date,
			sign
		}
	})
}

export const getUserIntegralAPI = () => {
	return http({
		url: '/integral',
	})
}

export const getIntegralChangeAPI = () => {
	return http({
		url: '/integral/change'
	})
}
import http from '../request/index.js'

export const getTicketListAPI = () => {
	return http({
		url: '/ticket'
	})
}

//可兑换红包list
export const getExchangeTicketAPI = () => {
	return http({
		url: '/ticket/sign'
	})
}
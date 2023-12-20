import http from '../request/index.js'

export const getTicketListAPI = () => {
	return http({
		url: '/tickets'
	})
}

//可兑换红包list
export const getExchangeTicketAPI = () => {
	return http({
		url: '/tickets/sign'
	})
}

export const getTicketInfoAPI = (id) => {
	return http({
		url: '/ticket',
		data: {
			id
		}
	})
}

export const updateExchangeTicketAPI = ({id,status,get_time}) => {
	return http({
		url: '/put/sign',
		method: 'PUT',
		data: {
			id,
			status,
			get_time,
		}
	})
}
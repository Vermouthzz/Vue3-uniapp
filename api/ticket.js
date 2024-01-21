import http from '../request/index.js'

//获取全部红包list
export const getTicketListAPI = (type = 1) => {
	return http({
		url: '/tickets',
		data: {
			type
		}
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
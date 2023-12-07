import http from '../request/index.js'

export const getTicketListAPI = () => {
	return http({
		url: '/ticket'
	})
}
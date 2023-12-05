import http from '../request/index.js'

export const getUserInfoAPI = (id) => {
	return http({
		url: '/user',
		data: {
			user_id: id
		}
	})
}


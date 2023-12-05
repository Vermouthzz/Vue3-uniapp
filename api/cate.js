import http from '../request/index.js'

export const getCateListAPI = () => {
	return http({
		url: '/category',
	})
}


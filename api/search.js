import http from '../request/index.js'

export const getSearchResultAPI = (name,type) => {
	return http({
		url: '/search',
		method: 'GET',
		data: {
			name,
			type
		}
	})
}



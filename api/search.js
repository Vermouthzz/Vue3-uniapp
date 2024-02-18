import http from '../request/index.js'

export const getSearchResultAPI = (name,type,first) => {
	return http({
		url: '/search',
		method: 'GET',
		data: {
			name,
			type,
			first
		}
	})
}

export const getHotCateSearchAPI = () => {
	return http({
		url: '/hot/cate'
	})
}


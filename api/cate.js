import http from '../request/index.js'

export const getCateListAPI = () => {
	return http({
		url: '/category',
	})
}

export const getGoodsListAPI = (id) => {
	return http({
		url: '/cate/list',
		data: {
			id
		}
	})
}
import http from '../request/index.js'

export const getCateListAPI = (id) => {
	return http({
		url: '/category',
		data: {
			id
		}
	})
}

export const getSubcateListAPI = (id, parent_id) => {
	return http({
		url: '/subcate',
		data: {
			parent_id,
			id
		}
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
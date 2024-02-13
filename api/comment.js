import http from '../request/index.js'

export const getCommentListAPI = (id) => {
	return http({
		url: '/comment/list',
		data: {
			id
		}
	})
}

export const getCommentGoodsAPI = (id) => {
	return http({
		url: '/comment',
		data: {
			order_id: id
		}
	})
}




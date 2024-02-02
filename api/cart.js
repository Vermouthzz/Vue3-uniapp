import http from '../request/index.js'

export const getCartListAPI = () => {
	return http({
		url: '/cart',
	})
}


export const addCartAPI = ({count, checked, sku_id,goods_id}) => {
	return http({
		url: '/cart',
		method: 'POST',
		data: {
			count,
			sku_id,
			checked,
			goods_id,
		}
	})
}

export const delCartAPI = (id) => {
	return http({
		url: '/cart',
		method: 'DELETE',
		data: {
			id
		}
	})
}

export const updateCartAPI = (list) => {
	return http({
		url: '/cart',
		method: 'PUT',
		data: {
			list,
		}
	})
}

export const getRecommendListAPI = ({pageNum, pageSize}) => {
	return http({
		url: '/list/cart',
		data: {
			pageNum,
			pageSize
		}
	})
}
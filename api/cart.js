import http from '../request/index.js'

export const getCartListAPI = (id) => {
	return http({
		url: '/cart',
		data: {
			user_id: id
		}
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
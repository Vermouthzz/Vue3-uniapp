import http from '../request/index.js'

export const createOrderAPI = (cart,addres,fee,num) => {
	return http({
		url: '/order',
		method: 'PUT',
		data: {
			cart,
			addres,
			fee,
			num
		}
	})
}

export const getOrderItemAPI = (id) => {
	return http({
		url: '/order',
		data: {
			id
		}
	})
}


export const getOrderListAPI = () => {
	return http({
		url: '/orders'
	})
}


export const updateOrderItemStatusAPI = (type,id) => {
	return http({
		url: '/order',
		method: 'POST',
		data: {
			type,
			id
		}
	})
}
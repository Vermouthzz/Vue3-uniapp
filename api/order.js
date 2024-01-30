import http from '../request/index.js'

export const createOrderAPI = (cart,addres,fee,num,total,li_num) => {
	console.log(li_num,total);
	return http({
		url: '/order',
		method: 'PUT',
		data: {
			cart,
			addres,
			fee,
			num,
			total,
			li_num
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

export const getOrderRecommendList = (id) => {
	return http({
		url: '/list/order',
		data: {
			order_id: id
		}
	})
}
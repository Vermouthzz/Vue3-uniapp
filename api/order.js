import http from '../request/index.js'

export const createOrderAPI = (cart,addres,user_ticket_id,li_num, pay) => {
	return http({
		url: '/order',
		method: 'PUT',
		data: {
			cart,
			addres,
			user_ticket_id,
			pay,
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

//type即为order的状态,5为查询全部orderlist
export const getOrderListAPI = (type) => {
	return http({
		url: '/orders',
		data: {
			type
		}
	})
}


export const updateOrderItemStatusAPI = (type,id, real_pay) => {
	return http({
		url: '/order',
		method: 'POST',
		data: {
			type,
			id,
			real_pay
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

export const getCreateOrderAPI = (ids) => {
	return http({
		url: '/order/create',
		method: 'POST',
		data: {
			ids
		}
	})
}
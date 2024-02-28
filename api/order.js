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

//type即为order的状态,5为查询全部orderlist
export const getOrderListAPI = (type) => {
	return http({
		url: '/orders',
		data: {
			type
		}
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

export const getCreateOrderAPI = (ids) => {
	return http({
		url: '/order/create',
		method: 'POST',
		data: {
			ids
		}
	})
}
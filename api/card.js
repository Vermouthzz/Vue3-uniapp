import http from '../request/index.js'


/**
 * 获取礼品卡、提货卡改变记录
 * @param    type  必传 
 * @param    1表示礼品卡、2表示提货卡
 */
export const getCardDetailAPI = (type) => {
	return http({
		url: '/card/detail',
		data: {
			type
		}
	})
}


export const updateCardNumsAPI = (order_id,type,is_use) => {
	return http({
		url: '/card',
		method: 'POST',
		data: {
			order_id,type,is_use
		}
	})
}

export const putCardItemsAPI = () => {
	return http({
		url: '',
		method: 'PUT',
		data: {
			
		}
	})
}
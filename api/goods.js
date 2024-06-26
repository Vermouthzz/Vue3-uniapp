import http from '../request/index.js'

export const getGoodsInfoAPI = (id) => {
	return http({
		url: '/goods',
		method: 'GET',
		data: {
			id
		}
	})
}

export const getBrandGoodsAPI = (id) => {
	return http({
		url: '/brand/goods',
		data: {
			brand_id: id
		}
	})
}

export const getSkuListAPI = (id) => {
	return http({
		url: '/sku',
		data: {
			goods_id: id
		}
	})
}

export const getAboutHotListAPI = (goods_id, category_id) => {
	return http({
		url: '/list/goods',
		data: {
			goods_id,
			category_id
		}
	})
}
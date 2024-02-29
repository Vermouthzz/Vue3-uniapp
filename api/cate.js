import http from '../request/index.js'

export const getCateListAPI = (id) => {
	return http({
		url: '/category',
		data: {
			id
		}
	})
}
/* 
 query: id
 传递当前三级分类id
 */
export const getSubcateListAPI = (id) => {
	return http({
		url: '/subcate',
		data: {
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
import http from '../request/index.js'

export const getSubcateListAPI = (val) => {
	return http({
		url: '/subcate',
		data: {
			id: val.id,
			f_parentId: val.parent_id
		}
	})
}
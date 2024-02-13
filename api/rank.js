import http from '../request/index.js'

export const getRankListAPI = (id) => {
	return http({
		url: '/rank',
		data: {
			id
		}
	})
}

export const getSingleRankListAPI = () => {
	return http({
		url: '/rank/single'
	})
}
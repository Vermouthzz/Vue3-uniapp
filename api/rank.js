import http from '../request/index.js'

export const getRankListAPI = () => {
	return http({
		url: '/rank'
	})
}

export const getSingleRankListAPI = () => {
	return http({
		url: '/rank/single'
	})
}
import http from '../request/index.js'

export const getHomeListAPI = ({page, pageSize}) => {
	return http({
		url: '/home',
		data: {
			page,
			pageSize
		}
	})
}


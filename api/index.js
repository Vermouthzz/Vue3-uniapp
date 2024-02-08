import http from '../request/index.js'

export const getHomeListAPI = ({page, pageSize},ids) => {
	return http({
		url: '/home',
		method: 'POST',
		data: {
			page,
			pageSize,
			ids
		}
	})
}

export const getHomeNavListAPI = () => {
	return http({
		url: '/home/nav'
	})
}


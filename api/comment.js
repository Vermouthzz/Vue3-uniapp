import http from '../request/index.js'

export const getCommentListAPI = () => {
	return http({
		url: '/comment',
	})
}


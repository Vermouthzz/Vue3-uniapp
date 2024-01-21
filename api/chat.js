import http from '../request/index.js'

export const getUserChatRecordAPI = (id,send) => {
	return http({
		url: '/chat',
		data: {
			id,
			send
		}
	})
}
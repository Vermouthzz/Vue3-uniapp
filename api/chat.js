import http from '../request/index.js'

export const getUserChatRecordAPI = () => {
	return http({
		url: '/user/chat'
	})
}
import http from '../request/index.js'

export const getUserChatRecordAPI = (id,send, {size, offset}) => {
	return http({
		url: '/chat',
		data: {
			id,
			send,
			size,
			offset
		}
	})
}

export const insertUserChatAPI = ({receiver_id, send_id, chat_time, message, is_read}) => {
	return http({
		url: '/chat',
		method: 'POST',
		data: {
			receiver_id, send_id, chat_time, message, is_read
		}
	})
}
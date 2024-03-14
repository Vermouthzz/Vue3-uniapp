import http from '../request/index.js'

export const getUserInfoAPI = () => {
	return http({
		url: '/user',
	})
}

export const updateUserInfo = (name,sign, gender) => {
	return http({
		url: '/userinfo',
		method: 'POST',
		data: {
			name,
			sign,
			gender
		}
	})
}

export const verifyPasswordAPI = (password) => {
	return http({
		url: '/verify',
		method: 'POST',
		data: {
			pwd: password
		}
	})
}

export const updateUserMoneyAPI = (money,type,num) => {
	return http({
		url: '/user/balance',
		method: 'POST',
		data: {
			money,
			type,
			num
		}
	})
}


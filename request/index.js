import {useUserStore} from '../store/useUserStore.js'

let baseUrl =  'http://localhost:3000/api/uni'

const httpInterceptor = {
	invoke(args) {
		args.url = baseUrl + args.url
		args.timeout = 10000
		args.header = {
			...args.header,
			'source-client': 'miniapp',
		}
		const userStore = useUserStore()
		const token = userStore.userInfo?.token
		if(token) {
			args.header.Authorization = token
		}
	}
}
uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('uploadFile',httpInterceptor)

const http = (options) => {
	return new Promise((resolve,reject) => {
		uni.request({
			...options,
			success: (res) => {
				resolve(res.data)
			}
		})
	})
}

export default http
import http from '../request/index.js'

export const getRegionAPI = (id) => {
	return http({
		url: '/region',
		data: {
			id
		}
	})
}


export const getAddressAPI = () => {
	return http({
		url: '/address'
	})
}

export const addAddressAPI = (formData) => {
	return http({
		url: '/address',
		method: 'POST',
		data: {
			...formData
		}
	})
}

export const delAddressAPI = (id) => {
	return http({
		url: '/address',
		method: 'DELETE',
		data: {
			addres_id : id
		}
	})
}

export const updateAddressListAPI = (val,id) => {
	return http({
		url: '/address/selected',
		method: 'PUT',
		data: {
			id,
			selected: val
		}
	})
}

export const updateAddressItemAPI = (formData) => {
	return http({
		url: '/address',
		method: 'PUT',
		data: {
			...formData
		}
	})
}
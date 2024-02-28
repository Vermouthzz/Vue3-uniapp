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

export const addAddressAPI = (obj,arr,checked) => {
	return http({
		url: '/address',
		method: 'POST',
		data: {
			name: obj.name,
			contact: obj.contact,
			detail_adr: obj.adress,
			ids: arr,
			checked
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

export const updateAddressItemAPI = (id) => {
	return http({
		url: '/address',
		method: 'PUT',
		data: {
			id
		}
	})
}
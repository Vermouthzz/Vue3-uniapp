// import {ref} from 'vue'

export const useMiddle = (className) => {
	return new Promise((resolve,reject) => {
		let top = 0
		let height = 0
		let rect = uni.getMenuButtonBoundingClientRect()
		let query = wx.createSelectorQuery()
		        query.select(className).boundingClientRect()
		        query.exec((res) => {
		          height = res[0].height
		          top = rect.top + rect.height / 2 - height / 2
				  resolve({
					  height,
					  top,
				  })
		})
	})
}




export const middle = () => {
	return new Promise((resolve) => {
		const {safeAreaInsets, statusBarHeight} = uni.getSystemInfoSync()
		const menu = uni.getMenuButtonBoundingClientRect()
		let navBatHeight = (menu.top - statusBarHeight) *2 + menu.height
		resolve(navBatHeight)
	})
}



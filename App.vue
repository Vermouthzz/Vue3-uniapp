<script>
	import {useUserStore} from './store/useUserStore.js'
	import {useAddressStore} from './store/useAddressStore.js'
	import {useCartStore} from './store/useCartStore.js'
	import {useUserCardStore} from './store/useUserCardStore.js'
	export default {
		onLaunch: async function() {
			const userStore = useUserStore()
			if(userStore.userInfo) {
				const addressStore = useAddressStore()
				const cartStore = useCartStore()
				const userCardStore = useUserCardStore()
				userCardStore.getUserCardInfo()
				addressStore.getAddresList()
				await cartStore.getCartList()
				// uni.setTabBarBadge({
				// 	index: 2,
				// 	text: cartStore.itemValues.length + ''
				// })
			}
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			uni.pageScrollTo({
				scrollTop: 1,
				duration: 0
			})
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("static/css/common.css");
</style>

<script>
	import {useUserStore} from './store/useUserStore.js'
	import {useAddressStore} from './store/useAddressStore.js'
	import {useCartStore} from './store/useCartStore.js'
	import {useUserCardStore} from './store/useUserCardStore.js'
	import {useTicketStore} from './store/useTicketStore.js'
	export default {
		onLaunch: async function() {
			const userStore = useUserStore()
			if(userStore.userInfo) {
				const addressStore = useAddressStore()
				const cartStore = useCartStore()
				const userCardStore = useUserCardStore()
				const ticketStore = useTicketStore()
				userCardStore.getUserCardInfo()
				ticketStore.getTicketList()
				addressStore.getAddresList()
				await cartStore.getCartList()
				// uni.setTabBarBadge({
				// 	index: 2,
				// 	text: cartStore.itemValues.length + ''
				// })
			}
		},
		onShow: function() {
			
		},
		onHide: function() {
			uni.pageScrollTo({
				scrollTop: 1,
				duration: 0
			})
		},
		data() {
			return {
				isMatch: false,
				observer: null
			}
		},
		methods: {
			initObserver() {
				this.observer = uni.createMediaQueryObserver(this)
				this.observer.observe({
					
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("static/css/common.css");
	@import url("iconfont/iconfont.css");
	
	/* #ifdef H5 */
	#app {
		max-width: 420px;
	}
	/* #endif */
</style>

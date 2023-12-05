import { ref } from "vue"


export const useProfileHook = () => {
	const quoteList = ref([
		{id: 1, name: '礼品卡', is_dollar: false, path: '/subpkg/card/card'},
		{id: 2, name: '余额', is_dollar: true, path: '/subpkg/balance/balance'},
		{id: 3, name: '红包', is_dollar: false, path: '/subpkg/redPacket/redPacket'},
		{id: 4, name: '优惠券', is_dollar: false, path: '/subpkg/redPacket/redPacket'}
	])
	
	const orderList = ref([
		{id: 1, name: '全部订单', icon: 'orders-o'},
		{id: 2, name: '待付款', icon: 'paid'},
		{id: 3, name: '待发货', icon: 'pending-payment'},
		{id: 4, name: '已发货', icon: 'logistics'},
		{id: 4, name: '待评价', icon: 'records-o'}
	])
	
	const serviceList = ref([
		{id:1,name: '地址管理', icon: 'location-o', path:'/subpkg/Address/Address'},
		{id:1,name: '账号安全', icon: 'shield-o', path:'/subpkg/Address/Address'},
		{id:1,name: '账号关联', icon: 'link-o', path:'/subpkg/Address/Address'},
		{id:1,name: '我的手机号', icon: 'phone-o', path:'/subpkg/Address/Address'},
		{id:1,name: '加好友交流', icon: 'friends-o', path:'/subpkg/Address/Address'},
	])
	
	return {
		quoteList,
		orderList,
		serviceList
	}
}
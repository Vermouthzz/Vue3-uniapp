import { ref } from "vue"
import {useUserCardStore} from '../../store/useUserCardStore.js'
import {useTicketStore} from '../../store/useTicketStore.js'

export const useProfileHook = () => {
	const userCardStore = useUserCardStore()
	const ticketStore = useTicketStore()
	const unUseTickets = ticketStore.userTicketList.filter(i => i.ticket_status == 0)
	const quoteList = ref([
		{id: 1, name: '礼品卡', is_dollar: false, path: '/profilePackge/card/card',num: userCardStore.userCard.length},
		{id: 2, name: '余额', is_dollar: true, path: '/profilePackge/balance/balance', num: userCardStore.userBalance.num},
		{id: 3, name: '红包', is_dollar: false, path: '/profilePackge/redPacket/redPacket', num: unUseTickets.length},
		{id: 4, name: '优惠券', is_dollar: false, path: '/profilePackge/redPacket/redPacket', num: 0}
	])
	
	const orderList = ref([
		{id: 1, name: '全部订单', icon: 'orders-o'},
		{id: 2, name: '待付款', icon: 'paid'},
		{id: 3, name: '待发货', icon: 'pending-payment'},
		{id: 4, name: '已发货', icon: 'logistics'},
		{id: 4, name: '待评价', icon: 'records-o'}
	])
	
	const serviceList = ref([
		{id:1,name: '地址管理', icon: 'location-o', path:'/profilePackge/Address/Address'},
		{id:2,name: '账号安全', icon: 'shield-o', path:'/profilePackge/ProfileSafe/ProfileSafe'},
		{id:3,name: '账号关联', icon: 'link-o', path:'/profilePackge/Address/Address'},
		{id:4,name: '我的手机号', icon: 'phone-o', path:'/profilePackge/Address/Address'},
		{id:5,name: '加好友交流', icon: 'friends-o', path:'/profilePackge/Address/Address'},
		{id:6,name: '积分乐园', icon: 'award-o', path:'/profilePackge/integral/integral'},
		{id:7,name: '在线客服', icon: 'service-o', path:'/profilePackge/onlineService/onlineService'}
	])
	
	return {
		quoteList,
		orderList,
		serviceList
	}
}
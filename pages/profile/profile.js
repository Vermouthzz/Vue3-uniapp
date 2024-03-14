import { ref } from "vue"
import {useUserCardStore} from '../../store/useUserCardStore.js'
import {useTicketStore} from '../../store/useTicketStore.js'

export const useProfileHook = () => {
	const userCardStore = useUserCardStore()
	const ticketStore = useTicketStore()
	const unUseTickets = ticketStore.userTicketList?.filter(i => i.ticket_status == 0)
	const li_card = userCardStore.userCard[0]?.children?.length || 0
	const h_card = userCardStore.userCard[1]?.children?.length || 0
	const quoteList = ref([
		{id: 1, name: '礼品卡', is_dollar: false, path: '/profilePackge/card/card',num: li_card + h_card},
		{id: 2, name: '余额', is_dollar: true, path: '/profilePackge/balance/balance', num: userCardStore.userBalance || 0},
		{id: 3, name: '红包', is_dollar: false, path: '/profilePackge/redPacket/redPacket', num: unUseTickets?.length || 0},
		{id: 4, name: '优惠券', is_dollar: false, path: '/profilePackge/redPacket/redPacket', num: 0}
	])
	
	const orderList = ref([
		{id: 1, name: '全部订单', icon: 'order', type: 5},
		{id: 2, name: '待付款', icon: 'daifukuan', type: 0},
		{id: 3, name: '待发货', icon: 'daifahuo', type: 1},
		{id: 4, name: '已发货', icon: 'yifahuo', type: 2},
		{id: 4, name: '待评价', icon: '31daipingjia', type: 3}
	])
	
	const serviceList = ref([
		{id:1,name: '地址管理', icon: 'local2', path:'/profilePackge/Address/Address'},
		{id:2,name: '账号安全', icon: 'safety', path:'/profilePackge/ProfileSafe/ProfileSafe'},
		{id:3,name: '账号关联', icon: 'local2', path:'/profilePackge/Address/Address'},
		{id:4,name: '我的手机号', icon: 'phone', path:'/profilePackge/Address/Address'},
		{id:5,name: '加好友交流', icon: 'local2', path:'/profilePackge/Address/Address'},
		{id:6,name: '积分乐园', icon: 'integral', path:'/profilePackge/integral/integral'},
		{id:7,name: '在线客服', icon: 'kefu', path:'/profilePackge/onlineService/onlineService'}
	])
	
	return {
		quoteList,
		orderList,
		serviceList
	}
}
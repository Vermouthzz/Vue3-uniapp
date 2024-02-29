<template>
	<view class="header-ticket-quote flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'红包'" :middle="true"></CustomHeader>
		<view class="header-tab">
			<van-tabs animated>
				<van-tab :title="item.name" v-for="item in packetTabs" :key="item.type">
					<scroll-view scroll-y="true" class="scroll-ticket-quote">
						<block v-for="(subItem,index) in item.list" :key="subItem.user_ticket_id">
							<red-ticket-item :tickets="subItem" :isSuit="subItem.ticket_status == 0" :dateFormat="subItem.ticket_status == 0"></red-ticket-item>
						</block>
					</scroll-view>
				</van-tab>
			</van-tabs>
		</view>
	</view>
</template>

<script setup>
import RedTicketItem from './components/RedTicketItem.vue'
import {useTicketStore} from '../../store/useTicketStore.js'
import { computed, ref } from 'vue'
import {onLoad} from '@dcloudio/uni-app'
import {getTicketListAPI} from '../../api/ticket.js'
const ticketStore = useTicketStore()
const {safeAreaInsets} = uni.getSystemInfoSync()

const packetTabs = ref([
	{ name: '未使用', type: 1, list: ticketStore.noUseTicket },
	{ name: '已使用', type: 2, list: ticketStore.hadUseTicket },
	{ name: '已过期', type: 3, list: ticketStore.hadExpiredTicket }
])

</script>

<style lang="scss">
page {
	height: 100vh;
	display: flex;
	flex-direction: column;
}
.header-ticket-quote {
	height: 100vh;
	border-bottom: 1px solid #f4f4f4;
	.header-top {
		padding-top: 30rpx;
		.title {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
		.back-icon {
			padding: 0 0 20rpx 16rpx;
		}
	}
	.header-tab {
		flex: 1;
		.scroll-ticket-quote {
			flex: 1;
			overflow: scroll;
			padding: 0 20rpx;
			box-sizing: border-box;
		}
	}
}

</style>

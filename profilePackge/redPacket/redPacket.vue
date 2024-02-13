<template>
	<view class="header-ticket-quote flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'红包'" :middle="true"></CustomHeader> >
		<view class="header-tab">
			<van-tabs animated swipeable>
				<van-tab title="未使用">
					<scroll-view scroll-y="true" class="scroll-ticket-quote">
						<block v-for="(subItem,index) in ticketStore.noUseTicket" :key="subItem.user_ticket_id">
							<red-ticket-item :tickets="subItem" :isSuit="subItem.ticket_status == 0"></red-ticket-item>
						</block>
					</scroll-view>
				</van-tab>
				<van-tab title="已使用">
					<scroll-view scroll-y="true" class="scroll-ticket-quote">
						<block v-for="(subItem,index) in ticketStore.hadUseTicket" :key="subItem.user_ticket_id">
							<red-ticket-item :tickets="subItem" :isSuit="subItem.ticket_status == 0"></red-ticket-item>
						</block>
					</scroll-view>
				</van-tab>
				<van-tab title="已过期">
					<scroll-view scroll-y="true" class="scroll-ticket-quote">
						<block v-for="(subItem,index) in ticketStore.hadExpiredTicket" :key="subItem.user_ticket_id">
							<red-ticket-item :tickets="subItem" :isSuit="subItem.ticket_status == 0"></red-ticket-item>
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
const ticketStore = useTicketStore()
const {safeAreaInsets} = uni.getSystemInfoSync()


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

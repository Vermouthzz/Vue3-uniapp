<template>
	<view class="header-ticket-quote flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'红包'" :middle="true"></CustomHeader>
		<view class="header-tab">
			<van-tabs animated sticky>
				<van-tab :title="item.name" v-for="(item, index) in packetTabs" :key="item.type">
					<scroll-view scroll-y="true" class="scroll-ticket-quote">
						<view class="save-block flex-a" v-show="activeIndex == index && saveMoney">
							<text class="line">——————————</text>
							<text class="save-money">已用红包省了{{saveMoney}}元</text>
							<text class="line">——————————</text>
						</view>
						<block v-for="(subItem,index) in item.list" :key="subItem.user_ticket_id">
							<red-ticket-item :hadUseDespire="subItem.ticket_status == 0" :tickets="subItem" :dateFormat="subItem.ticket_status == 0"></red-ticket-item>
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

const activeIndex = ref(1)
const saveMoney = computed(() => {
	if(ticketStore.hadUseTicket.length) {
		return ticketStore.hadUseTicket.reduce((pre, cur) => pre += cur.ticket_price, 0)
	}
})

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
		:deep(.van-sticky ) {
			border-bottom: 2rpx solid #ccc;
		}
		.scroll-ticket-quote {
			flex: 1;
			overflow: scroll;
			padding: 0 20rpx;
			box-sizing: border-box;
			.save-block {
				margin-top: 10rpx;
				font-size: 22rpx;
				color: #7d837e;
				.line {
				}
				.save-money {
					font-size: 24rpx;
					margin: 0 20rpx;
				}
			}
		}
	}
}

</style>

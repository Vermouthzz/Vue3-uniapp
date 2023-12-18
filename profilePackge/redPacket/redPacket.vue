<template>
	<view class="header-ticket-quote flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<Header :title="'红包'" :middle="true"></Header>
		<view class="header-tab">
			<van-tabs animated swipeable>
				<van-tab :title="item?.name" v-for="(item,index) in ticketList" :key="index">
					<scroll-view scroll-y="true" class="scroll-ticket-quote">
						<block v-for="(subItem,index) in item?.value" :key="subItem.user_ticket_id">
							<red-ticket-item :tickets="subItem" :isSuit="subItem.ticket_status == 0"></red-ticket-item>
							<!-- <quote-item></quote-item> -->
						</block>
					</scroll-view>
				</van-tab>
			</van-tabs>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import Header from '../card/header.vue'
import RedTicketItem from './components/RedTicketItem.vue'
// import QuoteItem from './components/QuoteItem.vue'
import {useUserCardStore} from '../../store/useUserCardStore.js'
import { ref } from 'vue'
import {getTicketListAPI} from '../../api/ticket.js'
// const userCardStore = useUserCardStore()
const {safeAreaInsets} = uni.getSystemInfoSync()

const ticketList = ref([])
const getTicketList = async () => {
	const res = await getTicketListAPI()
	ticketList.value = res.data
}


onLoad((options) => {
	getTicketList()
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
		.scroll-ticket-quote {
			flex: 1;
			overflow: scroll;
			padding: 0 20rpx;
			box-sizing: border-box;
		}
	}
}

</style>

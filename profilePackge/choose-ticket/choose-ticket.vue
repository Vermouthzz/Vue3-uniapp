<template>
	<view class="choose-ticket-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'选择红包'"></CustomHeader>
		<view class="choose-ticket-bd flex-c">
			<scroll-view scroll-y="true" class="scroll-ticket">
				<view class="suit-ticket">
					<template v-if="userCardStore.effectiveTickets.length">
						<view class="item" @tap="selectedItem(item)" v-for="item in userCardStore.effectiveTickets" :key="item.ticket_id">
							<red-ticket-item :dateFormat="false" :tickets="item" :isUse="false" :isSelected="item.selected"></red-ticket-item>
						</view>
					</template>
				</view>
				<view class="unsuit-ticket flex-c">
					<view class="unsuit-title flex">
						<text class="line">——</text>
						<text class="title-text">以下此订单不适用</text>
						<text class="line">——</text>
					</view>
					<view class="unsuit-item-block">
						<template v-if="userCardStore.uselessTickets.length">
							<block v-for="item in userCardStore.uselessTickets" :key="item.ticket_id">
								<red-ticket-item :dateFormat="false" :tickets="item" :isUse="false" :isSuit="false"></red-ticket-item>
							</block>
						</template>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="unuse-ticket-block" :style="{marginBottom: safeAreaInsets.bottom + 'px'}">
			<view class="unuse-ticket fff" @tap="unuseTicket">
				不使用红包
			</view>
		</view>
	</view>
	
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import RedTicketItem from '.././redPacket/components/RedTicketItem.vue'
import { computed, ref } from 'vue'
import {useTicketStore} from '../../store/useTicketStore.js'
const ticketStore = useTicketStore()
const {safeAreaInsets} = uni.getSystemInfoSync()

const selectedItem = (item) => {
	ticketStore.tapSelected(item)
}
//不使用红包
const unuseTicket = () => {
	ticketStore.unUseTicket()
}

onLoad(() => {
	
})
</script>

<style lang="scss">
page {
	height: 100vh;
	display: flex;
	flex-direction: column;
}
.choose-ticket-block {
	height: 100%;
	box-sizing: border-box;
	.choose-ticket-bd {
		height: calc(100% - 80rpx - 86rpx);
		.scroll-ticket {
			height: 100%;
			padding: 14rpx 0rpx 14rpx 20rpx;
			box-sizing: border-box;
			background-color: #f4f4f4;
			.suit-ticket {
				margin-right: 20rpx;
			}
			.unsuit-ticket {
				margin-right: 20rpx;
				.unsuit-title {
					padding: 40rpx 0 28rpx;
					justify-content: center;
					.title-text {
						margin: 0 16rpx;
						color: #6c6c6c;
					}
					.line {
						color: #d0d0d0;
					}
				}
			}
		}
	}
}
.unuse-ticket-block {
	height: 86rpx;
	border-top: 1px solid #774849;
	background-color: #fafafa;
	.unuse-ticket {
		padding: 24rpx 0;
		text-align: center;
		font-size: 13px;
	}
}
</style>

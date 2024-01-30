<template>
	<view class="quote-packet-block">
		<view class="common-block flex-a">
			<view class="left-block">
				优惠券：暂无可用
			</view>
			<view class="right-block">
				<text class="quote-count">0张</text>
				<van-icon name="arrow" size="32rpx" color="#6b6b6b"></van-icon>
			</view>
		</view>
		<view class="common-block flex-a" @tap="toTicketQuote()">
			<view class="left-block" v-if="!userCardStore.selectedTicket">
				红包：暂无可用
			</view>
			<view class="left-block" v-else>
				红包：{{userCardStore.selectedTicket.ticket_name || " "}}
			</view>
			<view class="right-block">
				<van-icon name="arrow" size="32rpx"  color="#6b6b6b"></van-icon>
			</view>
		</view>
		<view class="common-block flex-a">
			<view class="left-block">
				<van-checkbox shape="square" class="left-zero-checked" :value="h_checked" @change="onChange($event)" :disabled="userCardStore.userCard[1].card_num == 0 ? true : false">提货卡可用余额：￥{{userCardStore.userCard[1].card_num}}</van-checkbox>
			</view>
			<view class="right-block">
				<van-icon name="arrow" size="32rpx" color="#6b6b6b"></van-icon>
			</view>
		</view>
		<view class="common-block flex-a">
			<view class="left-block">
				<van-checkbox shape="square" :class="{leftZeroChecked: true}" :value="li_checked" @change="onChange($event,'li')" :disabled="userCardStore.userCard[0].card_num == 0 ? true : false" >礼品卡余额：￥{{userCardStore.userCard[0]?.card_num}}</van-checkbox>
			</view>
			<view class="right-block">
				<van-icon name="arrow" size="32rpx" color="#6b6b6b"></van-icon>
			</view>
		</view>
		<view class="common-block flex-a">
			<view class="left-block">
				<van-checkbox class="left-zero-checked" :disabled="userCardStore.userBalance <= 0" shape="square" :value="ba_checked" @change="onChange($event,'ba')">余额：￥{{userCardStore.userBalance}}</van-checkbox>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {useUserCardStore} from '../../../store/useUserCardStore.js'
const userCardStore = useUserCardStore()
const props = defineProps(['li_checked','h_checked','ba_checked'])
const emits = defineEmits(['checkChange','update:ba_checked'])
const toTicketQuote = (type) => {
	uni.navigateTo({
		url: '/profilePackge/choose-ticket/choose-ticket'
	})
}

const onChange = (e, type = 'h') => {
	if(type == 'li') {
		emits('checkChange', e.detail,type)
	} else if(type == 'ba') {
		emits('update:ba_checked', e.detail)
	} else {
		emits('checkChange', e.detail,type)
	}
}

</script>

<style lang="scss">
	.quote-packet-block {
			margin-top: 16rpx;
			padding-left: 16rpx;
			background-color: #fff;
			.common-block {
				padding: 24rpx 20rpx 24rpx 0;
				border-bottom: 1px solid #dbdbdb;
				justify-content: space-between;
				font-size: 13px;
				.left-block {
					// .left-checked {
					// 	color: #cecece;
					// 	:deep(.van-checkbox__label) {
					// 		color: #cecece;
					// 	}
					// }
					.left-zero-checked {
						color: #cecece;
						:deep(.van-checkbox__label) {
							color: #cecece;
						}
					}
				}
			}
		}
</style>
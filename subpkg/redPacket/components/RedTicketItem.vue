<template>
	<view class="red-ticket-block">
		<view class="is_selected" v-show="isSelected"></view>
		<view class="ticket-top flex-a" :style="{backgroundColor: isSuit ? '#ef656b': '#b8bcc3'}">
			<view class="price">
				{{tickets.ticket_price}}元
			</view>
			<view class="ticket">
				<view class="date-out" :style="{backgroundColor: color,display: tickets.sign == 1 ? '': 'none', borderColor: color}">
					即将过期
				</view>
				<view class="name-condition">
					<text class="name">{{tickets.ticket_name}}</text>
					<text class="condition">{{tickets.condition_name}}</text>
				</view>
				<view class="date" v-if="dateFormat">
					<van-count-down :time="validTime" format="DD天HH 时" />
				</view>
				<view class="forbid-date" v-else>
					{{startEnd}};还有{{surplusTime}}天过期
				</view>
			</view>
			<view class="to-use">
				<view class="btn-use" :style="{display: isUse ? '': 'none'}">
					去使用
				</view>
			</view>
		</view>
		<view class="more-detail flex" @tap="onShowMore">
			<view class="more-text" v-if="!isTap">
				{{isSuit ? '适用商品' : '参与优惠金额小于红包门槛'}}
			</view>
			<view class="more-text" v-else>
				休闲时尚、运动休闲、复古、休闲、居家生活、现代简约、美式、日式、时尚、通用、百搭、通勤、简约、简约时尚、基础休闲、IFASHION
			</view>
			<van-icon :name="isTap ? 'arrow-up': 'arrow-down'" class="arrow-up-down" size="28rpx" />
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
import {useTimeHook} from './hooks/useTimeHooks.js'
const {startEnd,validTime,surplusTime} = useTimeHook(props.tickets)
const props = defineProps({
	isUse: {
		type: Boolean,
		default: false
	},
	isSuit: {
		type: Boolean,
		default: true
	},
	isSelected: {
		type: Boolean,
		default: false
	},
	tickets: {
		type: Object,
		default: {}
	},
	dateFormat: {
		type: Boolean,
		default: true
	},
	// condition: {
		
	// }
})
const isTap = ref(false)
const onShowMore = () => {
	if(!props.isSuit) return
	isTap.value = !isTap.value
}

const color = computed(() => props.isSuit ? '#e11c20': '#7d837e')


</script>

<style lang="scss" scoped>
.red-ticket-block {
	position: relative;
	margin-top: 20rpx;
	border: 1px solid #cd7678;
	border-radius: 16rpx;
	
	.is_selected {
		position: absolute;
		width: 100%;
		height: 100%;
		right: 0;
		border: 1px solid #df1925;
		background-color: #df1925;
		border-radius: 0 16rpx 0 0;
		clip-path: polygon(86% 0, 100% 0%, 100% 36%, 95% 23%);
		&::after {
			position: absolute;
			top: 10rpx;
			right: 20rpx;
			content: '';
			width: 10rpx;
			height: 16rpx;
			border-right:2px solid #fff;
			border-bottom:2px solid #fff;
			transform: rotate(40deg);
		}
	}
	
	.ticket-top {
		padding: 24rpx 0;
		margin-left: -2rpx;
		margin-top: -2rpx;
		border-radius: 16rpx 16rpx 0 0;
		color: #fff;
		font-size: 13px;
		.price {
			flex: 1;
			padding-left: 70rpx;
			font-size: 22px;
		}
		.ticket {
			flex: 3.5;
			// margin-left: -20rpx;
			.date-out {
				width: fit-content;
				padding: 4rpx 12rpx;
				margin-bottom: 6rpx;
				border: 1px solid #7d837e;
				border-radius: 30rpx;
				font-size: 11px;
			}
			.condition {
				margin-left: 8rpx;
			}
			.date {
				margin-top: 8rpx;
				font-size: 11px;
				
				::v-deep(.van-count-down) {
					color: #fff;
				}
			}
			.forbid-date {
				margin-top: 8rpx;
				font-size: 10px;
			}
		}
		.to-use {
			flex: 1;
			.btn-use {
				width: fit-content;
				padding: 6rpx 16rpx;
				border: 1px solid #fff;
				background-color: #fff;
				border-radius: 36rpx;
				color: #ef656b;
			}
		}
	}
	.more-detail {
		justify-content: space-between;
		padding: 12rpx 20rpx;
		.more-text {
			font-size: 12px;
		}
		.arrow-up-down {
			height: 34rpx;
			margin-left: 30rpx;
		}
	}
}
</style>
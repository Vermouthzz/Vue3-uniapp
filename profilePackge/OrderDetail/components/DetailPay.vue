<template>
	<view class="price-fee fff flex-c">
		<view class="item-block flex" v-for="(item,index) in spec?.discount_info" :key="index">
			<text class="item-left">{{item.name}}：</text>
			<text class="item-right">{{item.value}}</text>
		</view>
		<view class="item-block flex all_price">
			<text class="item-left">{{spec.pay.name}}：</text>
			<text class="item-right">{{spec.pay.value}}<text v-show="li_nums > 0">(含礼品卡￥{{li_nums}})</text></text>
		</view>
	</view>
</template>

<script setup>
defineProps(['spec','li_nums'])
</script>

<style lang="scss" scoped>
.price-fee {
	padding: 16rpx 0rpx 16rpx 20rpx;
	margin-top: 12rpx;
	.item-block {
		margin-bottom: 10rpx;
		font-size: 13px;
		.item-left {
			flex: 1;
			color: #7a7a7a;
		}
		.item-right {
			flex: 2;
			margin-left: 20rpx;
		}
		&:last-of-type {
			margin: 0;
		}
	}
	.all_price {
		padding-bottom: 18rpx;
		border-bottom: 1px solid #d6d6d6;
		color: #a4323c;
		.item-left {
			color: #a4323c;
		}
	}
}
</style>
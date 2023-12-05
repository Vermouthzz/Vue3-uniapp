<template>
	<view class="error-box flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'支付结果'" :middle="true"></CustomHeader>
		<view class="result-body flex-c">
			<view class="result-text">
				<view class="error-pay">
					支付失败
				</view>
				<view class="error-delay">
					<text>请在<text class="err">1小时</text>内完成付款</text>
					<text class="err">否则订单会被系统取消</text>
				</view>
			</view>
			<view class="show-repay flex">
				<view class="block check-order">
					查看订单
				</view>
				<view class="block re-pay">
					重新支付
				</view>
			</view>
			<view class="pay-detail">
				<view class="addres-user">
					<text class="text">工藤新一</text>
					<text class="price">139****4611</text>
				</view>
				<view class="addres-detail">
					
				</view>
				<view class="should-pay">
					<text class="text">实付:</text>
					<text class="price">￥88.00</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const {safeAreaInsets} = uni.getSystemInfoSync()
</script>

<style lang="scss">
.error-box {
	height: 100vh;
	.result-body {
		.result-text {
			width: 40vw;
			margin: 80rpx auto;
			.error-pay {
				margin-bottom: 20rpx;
				color: #ba2631;
				font-size: 18px;
				font-weight: 500;
				text-align: center;
			}
			.error-delay {
				display: inline-block;
				font-size: 14px;
				text-align: center;
			}
		}
		.show-repay {
			width: 52vw;
			margin: 0 auto;
			justify-content: space-between;
			.block {
				padding: 16rpx 30rpx;
				border: 1px solid #c0c0c0;
				border-radius: 4rpx;
				font-size: 13px;
			}
		}
		.pay-detail {
			
		}
	}
}
</style>

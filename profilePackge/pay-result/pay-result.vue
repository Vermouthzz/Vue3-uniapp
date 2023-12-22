<template>
	<view class="error-box flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'支付结果'" :middle="true"></CustomHeader>
		<view class="result-body flex-c">
			<view class="result-text">
				<block v-if="true">
					<view class="error-pay">
						支付失败
					</view>
					<view class="error-delay flex-c">
						<text>请在<text class="err">1小时</text>内完成付款</text>
						<text class="err">否则订单会被系统取消</text>
					</view>
				</block>
				<view class="success-pay" v-else>
					支付成功
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
			<view class="pay-detail flex-c">
				<view class="addres-user flex">
					<text class="text">工藤新一</text>
					<text class="price">139****4611</text>
				</view>
				<view class="addres-detail flex">
					北京市北京市大兴区北京经济技术开发区京东
				</view>
				<view class="should-pay flex">
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
	box-sizing: border-box;
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
				font-size: 14px;
				text-align: center;
				.err {
					color: #a8323b;
				}
			}
			.success-pay {
				color: #20b44f;
				font-size: 22px;
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
			margin: 34rpx 20rpx;
			padding: 30rpx 24rpx;
			border: 1px solid #e6e9c7;	
			background-color: #fffbf2;
			border-radius: 16rpx;
			font-size: 12px;
			.addres-user {
				.text {
					width: 20vw;
					
				}
			}
			.addres-detail {
				margin: 12rpx 0;
			}
			.should-pay {
				.text {
					width: 20vw;
					color: #95968e;
				}
			}
		}
	}
}
</style>

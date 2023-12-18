<template>
	<view class="detail-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'积分明细'" :middle="true" />
		<view class="detail-block-body">
			<view class="integral flex-c-a">
				<text class="user-integral">我的积分</text>
				<text class="integral-num">330</text>
			</view>
			<view class="integral-detail flex-c">
				<view class="integral-item flex-a">
					<view class="item-left flex-c">
						<text>签到积分</text>
						<text class="date">2023-12-18 07:06:09</text>
					</view>
					<view class="item-right">
						+10
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
const {safeAreaInsets} = uni.getSystemInfoSync()

onLoad((options) => {
	
})
</script>

<style lang="scss">
.detail-block {
	height: 100vh;
	box-sizing: border-box;
	.detail-block-body {
		flex: 1;
		padding: 0 20rpx;
		margin-top: 20rpx;
		.integral {
			width: 100%;
			height: 240rpx;
			justify-content: center;
			background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
			border-radius: 24rpx;
			.user-integral {
				font-size: 13px;
				color: #966e07;
			}
			.integral-num {
				margin-top: 12rpx;
				font-size: 20px;
				color: #8b4f18;
			}
		}
		.integral-detail {
			.integral-item {
				justify-content: space-between;
				padding: 16rpx 0;
				border-bottom: 1px solid #dadada;
				font-size: 13px;
				.item-left {
					.date {
						margin-top: 4rpx;
						color: #969696;
						font-size: 12px;
					}
				}
				.item-right {
					color: #f37f2b;
				}
			}
		}
	}
}
</style>

<template>
	<view class="brand-header flex-c">
		<view class="header-info flex">
			<view class="info-left">
				<image class="info-image" :src="brandInfo.brand_pic"></image>
			</view>
			<view class="info-right flex-c">
				<view class="name">
					{{brandInfo.brand_name}}
				</view>
				<view class="all-num">
					全部商品{{brandInfo.count}}件
				</view>
			</view>
		</view>
		<view class="brand-desc">
			{{brandInfo.brand_desc}}
		</view>
	</view>
</template>

<script setup>
const props = defineProps(['brandInfo'])
</script>

<style lang="scss">
	.brand-header {
		padding: 0 24rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		.header-info {
			padding: 60rpx 0 60rpx 16rpx;
			.info-left {
				margin-right: 24rpx;
				.info-image {
					display: block;
					width: 100rpx;
					height: 100rpx;
					box-shadow: -2rpx 2rpx 20rpx #eee;
				}
			}
			.info-right {
				justify-content: space-between;
				.name {
					font-size: 18px;
					font-weight: 650;
				}
				.all-num {
					font-size: 13px;
				}
			}
		}
		.brand-desc {
			font-size: 13px;
			padding-bottom: 30rpx;
		}
	}
</style>
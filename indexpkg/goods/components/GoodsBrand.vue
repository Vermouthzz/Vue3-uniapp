<template>
	<view class="brand-block flex" @tap="toBrandPage">
		<view class="brand-img">
			<image class="brand-image" :src="props.brandInfo?.brand_pic"></image>
		</view>
		<view class="brand-info flex-c">
			<view class="info-title">
				<text class="b-title">{{props.brandInfo?.brand_name}}</text>
				<van-icon name="arrow" size="40rpx" class="b-right"></van-icon>
			</view>
			<view class="info-produce">
				{{props.brandInfo?.brand_desc}}
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps()
const toBrandPage = () => {
	uni.navigateTo({
		url: `/goodsPages/brand/brand?id=${props.brandInfo?.brand_id}`
	})
}
</script>

<style lang="scss">
	.brand-block {
		padding: 40rpx 20rpx 40rpx 40rpx;
		margin-top: 16rpx;
		background-color: #fff;
		.brand-img {
			margin-right: 36rpx;
			.brand-image {
				width: 120rpx;
				height: 120rpx;
			}
		}
		.brand-info {
			.info-title {
				position: relative;
				padding-bottom: 30rpx;
				.b-title {
					font-size: 15px;
					font-weight: 550;
				}
				.b-right {
					position: absolute;
					right: 0;
					top: 10rpx;
				}
			}
			.info-produce {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 12px;
			}
		}
	}
</style>
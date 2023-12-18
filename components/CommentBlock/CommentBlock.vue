<template>
	<view class="comment-detail flex-c">
		<view class="user-info flex-a">
			<image class="user-info-image" src="https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"></image>
			<text>用****4</text>
		</view>
		<view class="date-order">
			<text>2023-10-22 12:50</text>
			<text>纯牛奶</text>
			<text>12盒*2提</text>
		</view>
		<view class="comment-text-img">
			<view class="comment-text">
				挺好穿的，就是可能是我胖了点有点紧，我体重46公斤，我以为会松点的吖，可能是生完宝宝胖了，哈哈哈哈哈哈
			</view>
			<view class="comment-img flex">
				<image class="comment-image" src="https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"></image>
				<image class="comment-image" src="https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"></image>
				<image class="comment-image" src="https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"></image>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss">
	.comment-detail {
		padding: 30rpx 60rpx 20rpx 20rpx;
		font-size: 14px;
		.user-info {
			.user-info-image {
				width: 60rpx;
				height: 60rpx;
				margin-right: 16rpx;
				border-radius: 50%;
			}
		}
		.date-order {
			margin: 16rpx 0;
			font-size: 12px;
			color: #848484;
		}
		.comment-text-img {
			.comment-text {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				//要显示的行数 2
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.comment-img {
				margin-top: 20rpx;
				.comment-image {
					width: 140rpx;
					height: 140rpx;
					margin-right: 40rpx;
					&:last-child {
						margin: 0;
					}
				}
			}
		}
	}
</style>
<template>
	<view class="comment-detail flex-c">
		<view class="user-info flex-a">
			<image class="user-info-image" src="https://yanxuan.nosdn.127.net/static-union/164793255107785e.png"></image>
			<text>{{item.user_name}}</text>
		</view>
		<view class="date-order">
			<text>2023-10-22 12:50</text>
			<text>纯牛奶</text>
			<text>12盒*2提</text>
		</view>
		<view class="comment-text-img">
			<view class="comment-text">
				{{item.text}}
			</view>
			<view class="comment-img flex">
				<image class="comment-image" :src="item.img" v-for="(item,index) in imgs" :key="index" @tap="onShowImg(item,index)"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	item: {
		type: Object,
		default: {}
	}
})
const imgs = ref([
	{ img: 'https://yanxuan.nosdn.127.net/static-union/164793255107785e.png' },
	{ img: 'https://yanxuan.nosdn.127.net/static-union/164793255107785e.png' },
	{ img: 'https://yanxuan.nosdn.127.net/static-union/164793255107785e.png' },
])
const onShowImg = (item,index) => {
	if(!props.show) return
	uni.previewImage({
		urls: imgs.value.map(item => item.img),
		current: index,
		count: item.img
	})
}
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
				border: 1px solid #f6f6f6;
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
<template>
	<view class="comment-detail flex-c">
		<view class="user-info flex-a">
			<image class="user-info-image" :src="item.user_avator"></image>
			<text>{{item.user_name}}</text>
		</view>
		<view class="date-order">
			<text>{{formatDate(item.date)}}</text>
			<text class="goods-sku">纯牛奶12盒*12提</text>
		</view>
		<view class="comment-text-img">
			<view class="comment-text">
				{{item.text}}
			</view>
			<view class="comment-img flex" v-if="commentImgs">
				<image class="comment-image" :src="item" v-for="(item,index) in commentImgs" :key="index" @tap="onShowImg(item,index)"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref } from 'vue'
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

const formatDate = (time) => {
	const date = new Date(Number(time))
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2,'0')
	const hours = date.getHours().toString().padStart(2,'0')
	const mintune = date.getMinutes().toString().padStart(2,'0')
	return `${year}-${month}-${day} ${hours}:${mintune}`
}

const commentImgs = computed(() => props.item.picture?.split(','))
const onShowImg = (item,index) => {
	if(!props.show) return
	uni.previewImage({
		urls: commentImgs.value?.map(item => item),
		current: index,
		count: item
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
			.goods-sku {
				margin-left: 8rpx;
			}
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
					border: 1px solid #f6f6f6;
					&:last-child {
						margin: 0;
					}
				}
			}
		}
	}
</style>
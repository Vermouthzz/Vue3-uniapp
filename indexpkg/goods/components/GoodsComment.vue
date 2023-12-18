<template>
	<view class="user-comment">
		<view class="comment-title flex-a" @tap="toComment">
			<view class="comment-title-left">
				<text>用户评价(6000+)</text>
			</view>
			<view class="comment-title-right">
				<text>99.8% 好评</text>
				<text>></text>
			</view>
		</view>
		<comment-block></comment-block>
	</view>
</template>

<script setup>
import CommentBlock from '../../../components/CommentBlock/CommentBlock.vue'
const toComment = () => {
	uni.navigateTo({
		url: '/goodsPages/comment/comment'
	})
}
</script>

<style lang="scss">
	.user-comment {
		margin-top: 16rpx;
		background-color: #fff;
		.comment-title {
			justify-content: space-between;
			padding: 40rpx 20rpx;
			border-bottom: 1px solid #9b9b9b;
			font-size: 14px;
		}
	}
</style>
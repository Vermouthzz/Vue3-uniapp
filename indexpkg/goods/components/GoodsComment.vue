<template>
	<view class="user-comment" @tap="toComment">
		<view class="comment-title flex-a">
			<view class="comment-title-left">
				<text>用户评价(6000+)</text>
			</view>
			<view class="comment-title-right">
				<text>99.8% 好评</text>
				<text>></text>
			</view>
		</view>
		<CommentBlock :show="false"></CommentBlock>
	</view>
</template>

<script setup>
const props = defineProps(['id'])
const toComment = () => {
	uni.navigateTo({
		url: `/goodsPages/comment/comment?id=${props.id}`
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
<template>
	<view class="comment-top" :style="{paddingTop: top + 'px'}">
		<view class="title-left" @tap="toBack">
			<van-icon name="arrow-left" />
		</view>
		<!-- 二级分类标题 -->
		<view class="title">
			评价
		</view>
	</view>
	<view class="good-comment flex-c">
		<text>99.9%好评</text>
		<view class="comment-item-block flex">
			<view class="comment-item selected">
				全部(1234)
			</view>
			<view class="comment-item">
				最新(1222)
			</view>
			<view class="comment-item">
				有图(10)
			</view>
			<view class="comment-item">
				追评(2)
			</view>
		</view>
	</view>
	<comment-block></comment-block>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {ref} from 'vue'
import CommentBlock from '../../indexpkg/components/CommentBlock.vue'
import {useMiddle } from '../../hooks/useMiddle.js'
import {getCommentListAPI} from '../../api/comment.js'
const toBack = () => {
	uni.navigateBack()
}

const commentList = ref('')
const getCommentList = async () => {
	const res = await getCommentListAPI()
	commentList.value = res
}

const top = ref(0)
onLoad((options) => {
	useMiddle('.comment-top').then(res => {
		top.value = res.top
	})
	getCommentList()
})
</script>

<style lang="scss">
	.comment-top {
		display: flex;
		padding: 0 16rpx;
		font-weight: 500;
		.title {
			margin-left: 12rpx;
		}
	}
	.good-comment {
		margin-top: 30rpx;
		padding: 0 16rpx;
		font-size: 13px;
		border-bottom: 1px solid #dadada;
		.comment-item-block {
			margin: 30rpx 0;
			.comment-item {
				padding: 16rpx;
				margin-right: 24rpx;
				font-size: 11px;
				border: 1px solid #7f7f7f;
				&.selected {
					color: #a83130;
					border: 1px solid #a83130;
				}
			}
		}
	}
</style>

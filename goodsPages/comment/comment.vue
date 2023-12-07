<template>
	<view class="comment-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'评价'"></CustomHeader>
		<!-- <view class="good-comment flex-c">
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
		</view> -->
		<CommentBlock></CommentBlock>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import {ref} from 'vue'
import CommentBlock from '../../indexpkg/components/CommentBlock.vue'
import {getCommentListAPI} from '../../api/comment.js'
const {safeAreaInsets} = uni.getSystemInfoSync()

const commentList = ref('')
const getCommentList = async () => {
	const res = await getCommentListAPI()
	commentList.value = res
}

onLoad((options) => {
	getCommentList()
})
</script>

<style lang="scss">
	.comment-block {
		height: 100vh;
		box-sizing: border-box;
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
	}
</style>

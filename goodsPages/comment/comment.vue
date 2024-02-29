<template>
	<view class="comment-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'评价'"></CustomHeader>
		<scroll-view scroll-y="true" class="comment-scroll flex-c" enable-flex @scrolltolower="onLoadMore">
			<view class="goods-comment flex-c">
				<text>99.9%好评</text>
				<view class="comment-view-block flex">
					<view class="comment-view" 
					:class="{selected: activeType == item.type}" 
					v-for="(item,index) in list" :key="item.type"
					@tap="handleSwitch(item)"
					>
						{{item.name}}({{index}})
					</view>		
				</view>
			</view>
			<view class="comment-item-block" v-for="(item,index) in commentList" :key="index">
				<CommentBlock :item="item"></CommentBlock>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import {onLoad, onReady} from '@dcloudio/uni-app'
import {ref} from 'vue'
import {getCommentListAPI} from '../../api/comment.js'
const {safeAreaInsets} = uni.getSystemInfoSync()
const list = ref([
	{ name: '全部', type: 1 },
	{ name: '最新', type: 2 },
	{ name: '有图', type: 3 },
	{ name: '建议', type: 4 },
])
const activeType = ref(1)
const handleSwitch = (item) => {
	page.value.pageNum = 1
	activeType.value = item.type
}

const page = ref({
	pageSize: 10,
	pageNum: 1
})
const commentList = ref([])
const getCommentList = async (id) => {
	const res = await getCommentListAPI(id,page.value,activeType.value)
	commentList.value = res.result
}

//下拉加载更多
const onLoadMore = () => {
	page.value.pageNum++
}

// const height_ = ref(0)
// onReady(() => {
// 	const top = uni.createSelectorQuery().select('.good-comment')
// 	top.boundingClientRect(res => {
// 		height_.value = res.height
// 	}).exec()
// })

onLoad((options) => {
	getCommentList(options.id)
})
</script>

<style lang="scss">
	page {
		height: 100vh;
	}
	.comment-block {
		height: 100%;
		box-sizing: border-box;
		.comment-scroll {
			flex: 1;
			overflow: scroll;
			.goods-comment {
				margin-top: 30rpx;
				padding: 0 16rpx;
				font-size: 13px;
				border-bottom: 1px solid #dadada;
				.comment-view-block {
					margin: 30rpx 0;
					.comment-view {
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
			.comment-item-block {
				border-bottom: 1px solid #f4f4f4;
			}
		}
	}
</style>

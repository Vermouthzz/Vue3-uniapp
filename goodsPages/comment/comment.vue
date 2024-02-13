<template>
	<view class="comment-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'评价'"></CustomHeader>
		<view class="comment-body flex-c">
			<view class="good-comment flex-c">
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
			<scroll-view scroll-y="true" class="comment-scroll" :style="{height: `calc(100% - ${height_}px)`}">
				<view class="comment-item-block" v-for="(item,index) in commentList" :key="index">
					<CommentBlock :item="item"></CommentBlock>
				</view>
			</scroll-view>
		</view>
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
	activeType.value = item.type
}

const page = ref({
	size: 10,
	current: 1
})
const commentList = ref('')
const getCommentList = async (id) => {
	const res = await getCommentListAPI(id,page.value)
	console.log(res);
	commentList.value = res.result
}

const height_ = ref(0)
onReady(() => {
	const top = uni.createSelectorQuery().select('.good-comment')
	top.boundingClientRect(res => {
		height_.value = res.height
	}).exec()
})

onLoad((options) => {
	getCommentList(options.id)
})
</script>

<style lang="scss">
	.comment-block {
		height: 100vh;
		box-sizing: border-box;
		.comment-body {
			flex: 1;
			.good-comment {
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
			.comment-scroll {
				
				.comment-item-block {
					
				}
			}
		}
	}
</style>

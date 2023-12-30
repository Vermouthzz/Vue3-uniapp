<template>
	<view class="write-comment-block fff" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'评价'"></CustomHeader>
		<view class="write-comment-body flex-c">
			<!-- 商品信息板块 -->
			<view class="goods-detail flex">
				<image src="https://yanxuan-item.nosdn.127.net/aed476674dfbbdfcd6e265ffab69c9cd.jpg?type=webp&imageView&quality=65&thumbnail=330x330" class="goods-left"></image>
				<view class="goods-right flex-c">
					<text class="goods-name"></text>
					<text class="goods-sku"></text>
				</view>
			</view>
			<!-- 评分板块 -->
			<view class="comment-star flex-a">
				<text class="name">评分</text>
				<van-rate
				  :value="star"
				  :size="24"
				  color="#ffd21e"
				  void-icon="star"
				  void-color="#eee"
				  @change="onStarChange"
				/>
				<text class="star-name">{{starName}}</text>
			</view>
			<!-- 问题板块 -->
			<view class="question flex-c">
				<text class="title">请选择你遇到的问题:</text>
				<view class="question-items-block flex">
					<block v-for="(item,index) in questionList" :key="index">
						<view class="item">
							{{item}}
						</view>
					</block>
				</view>
			</view>
			<!-- 用户建议板块 -->
			<view class="user-suggestion">
				<textarea class="suggestion" :value="userSuggestion" placeholder="提出你的建议,我们会努力改进" />
				<view class="limmit">
					{{userSuggestion.length}}/300
				</view>
			</view>
			<!-- 添加图片板块 -->
			<view class="add-image flex-c">
				<text class="add-title">还可以添加3张图片呦</text>
				<view class="image-block">
					<view class="upload-image flex">
						<van-icon name="plus" />
					</view>
				</view>
				<view class="submit">
					提交
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
const {safeAreaInsets} = uni.getSystemInfoSync()
const star = ref(5)
const starList = ['非常差','差','一般吧','满意','非常满意']
const questionList = ref(['商品问题','客服问题','物流问题','包装问题','其它'])
const userSuggestion = ref('')

const starName = ref('')
watchEffect(() => {
	starName.value = starList[star.value - 1]
})
const onStarChange = (e) => {
	star.value = e.detail
	
}
</script>

<style lang="scss">
page {
	height: 100vh;
	background-color: #f4f4f4;
}
.write-comment-block {
	.write-comment-body {
		padding: 0 28rpx;
		.goods-detail {
			padding: 30rpx 0 20rpx;
			.goods-left {
				width: 140rpx;
				height: 140rpx;
			}
			.goods-right {
				justify-content: space-around;
				.goods-name {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 26rpx;
				}
				.goods-sku {
					color: #808080;
					font-size: 22rpx;
				}
			}
		}
		.comment-star {
			margin-bottom: 16rpx;
			:deep(.van-rate) {
				margin: 0 18rpx;
			}
			font-size: 26rpx;
		}
		.question {
			margin-bottom: 10rpx;
			.title {
				margin-bottom: 26rpx;
				color: #808080;
				font-size: 22rpx;
			}
			.question-items-block {
				flex-wrap: wrap;
				.item {
					width: fit-content;
					padding: 8rpx 14rpx;
					margin: 0 22rpx 22rpx 0;
					border: 2px solid #808080;
					font-size: 14px;
				}
			}
		}
		.user-suggestion {
			position: relative;
			height: 280rpx;
			margin-bottom: 30rpx;
			padding: 26rpx 30rpx;
			border: 1px solid #d7d7d7;
			border-radius: 16rpx;
			box-sizing: border-box;
			.suggestion {
				width: 100%;
				font-size: 13px;
			}
			.limmit {
				position: absolute;
				bottom: 14rpx;
				right: 16rpx;
			}
		}
		.add-image {
			margin-bottom: 24rpx;
			.add-title {
				font-size: 22rpx;
				color: #ababab;
			}
			.image-block {
				margin-top: 32rpx;
				.upload-image {
					justify-content: center;
					align-items: center;
					// width: 96rpx;
					// height: 96rpx;
					width: 144rpx;
					height: 144rpx;
					// padding: 24rpx;
					border: 1px dashed #cbcbcb;
					font-size: 56px;
					color: #cbcbcb;
				}
			}
			.submit {
				width: 168rpx;
				height: 62rpx;
				margin: 26rpx 0 26rpx auto;
				border: 1px solid #7f7f7f;
				text-align: center;
				line-height: 62rpx;
			}
		}
	}
}
</style>

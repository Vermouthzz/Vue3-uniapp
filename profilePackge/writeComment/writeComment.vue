<template>
	<view class="write-comment-block fff" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'评价'"></CustomHeader>
		<view class="write-comment-body flex-c">
			<!-- 商品信息板块 -->
			<view class="goods-detail flex">
				<image :src="goodsInfo.pic" class="goods-left"></image>
				<view class="goods-right flex-c">
					<text class="goods-name">{{goodsInfo.goods_name}}</text>
					<text class="goods-sku">{{goodsInfo.sku}}</text>
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
			<view class="question flex-c" v-if="star <= 3">
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
				<textarea class="suggestion" v-model="userSuggestion" :placeholder="placeHolder" />
				<view class="limmit">
					{{userSuggestion.length}}/300
				</view>
			</view>
			<!-- 添加图片板块 -->
			<view class="add-image flex-c">
				<text class="add-title">还可以添加{{3 - images.length}}张图片呦</text>
				<view class="image-block flex">
					<block v-if="images.length">
						<view class="comment-image-block" v-for="(item,index) in images" :key="index">
							<image :src="item" class="comment-img"></image>
							<view class="cancel-icon" @tap="onDeleteImg(index)">
								<van-icon name="close" color="#ececec" size="24rpx"></van-icon>
							</view>
						</view>
					</block>
					<view class="upload-image flex" @tap="uploadImg">
						<van-icon name="plus" />
					</view>
				</view>
				<view class="submit" @tap="onSubmit">
					提交
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import {onLoad} from '@dcloudio/uni-app'
import {getCommentGoodsAPI} from '../../api/comment.js'
import {updateOrderItemStatusAPI} from '../../api/order.js'
const {safeAreaInsets} = uni.getSystemInfoSync()
const star = ref(5)
const starList = ['非常差','差','一般吧','满意','非常满意']
const questionList = ref(['商品问题','客服问题','物流问题','包装问题','其它'])
const userSuggestion = ref('')
const placeHolder = computed(() => star.value > 3 ? '说说值得推荐的理由吧~' : '提出你的建议,我们会努力改进')

const starName = ref('')
watchEffect(() => {
	starName.value = starList[star.value - 1]
})
const onStarChange = (e) => {
	star.value = e.detail
}

const images = ref([])
const uploadImg = () => {
	if(images.value.length >= 3) return uni.showToast({
		title: '最大上传3张图片哦',
		icon: 'fail'
	})
	uni.chooseImage({
		count: 1,
		sourceType: 'album ',
		success: (res) => {
			const file = res.tempFilePaths[0]
			images.value.push(file)
		}
	})
}

//删除图片
const onDeleteImg = (index) => {
	images.value.splice(index,1)
}


//提交评论
const onSubmit = async () => {
	const time = new Date()
	const formData = {
		id: 'none',
	    star: star.value,
	    text: userSuggestion.value,
	    date: time.getTime(),
	    goods_id: goodsInfo.value.goods_id
	};
	try{
		const res = await uni.uploadFile({
			url: '/comment',
			filePath: images.value[0],
			name: 'comment-img',
			header: {
				"Content-Type": "multipart/form-data"
			},
			formData: formData,
			success: async (res) => {
				const data = JSON.parse(res.data)
				formData.id = data.id
				if(images.value.length > 1) {
					const uploadTasks = images.value.slice(1).map(item => {
						return new Promise((resolve, reject) => {
							uni.uploadFile({
								url: '/comment',
								filePath: item,
								name: 'comment-img',
								header: {
								  "Content-Type": "multipart/form-data"
								},
								formData: formData,
								success: (res) => {
								  resolve(); // 标记当前上传任务完成
								}
							})
						})
					})
					await Promise.all(uploadTasks)
				}
				await updateOrderItemStatusAPI(4,order_id.value)
				uni.showToast({
					icon: 'success',
					title: '评价成功'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 500)
			}
		})
	}catch(e){

	}
}

const goodsInfo = ref({})
const getGoodsInfo = async (id) => {
	const res = await getCommentGoodsAPI(id)
	goodsInfo.value = res.result
}

const order_id = ref('')
onLoad((options) => {
	getGoodsInfo(options.id)
	order_id.value = options.id
})
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
				justify-content: space-evenly;
				margin-left: 20rpx;
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
				font-size: 22rpx;
			}
		}
		.add-image {
			margin-bottom: 24rpx;
			.add-title {
				font-size: 22rpx;
				color: #ababab;
			}
			.image-block {
				flex-wrap: wrap;
				margin-top: 32rpx;
				.comment-image-block {
					position: relative;
					.comment-img {
						width: 146rpx;
						height: 146rpx;
						margin-right: 26rpx;
					}
					.cancel-icon {
						position: absolute;
						top: -20rpx;
						right: 12rpx;
						z-index: 100;
					}
				}
				.upload-image {
					justify-content: center;
					align-items: center;
					width: 146rpx;
					height: 146rpx;
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

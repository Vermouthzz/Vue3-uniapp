<template>
	<view class="index-nav">
		<scroll-view scroll-x="true" class="scroll-cate" @scroll="onNavScroll" show-scrollbar="false">
			<view class="cate-item flex-c" v-for="(item,index) in list" :key="index">
				<navigator class="top-item flex-c-a" :url="'/indexpkg/GoodsList/GoodsList?id=' + subItem.category_id" v-for="subItem in item" :key="item.category_id">
					<image class="index-image" :src="subItem.img_url"></image>
					<view class="item-text">
						{{subItem.category_name}}
					</view>
				</navigator>
			</view>
		</scroll-view>
		<view class="scroll-line flex-a">
			<view class="line">
				<view class="move-line" :style="{left: moveRpx + 'px'}"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps(['list'])
const moveRpx = ref(0)
const onNavScroll = (e) => {
	const width = Math.floor(e.detail.scrollWidth / 2) //px
	Math.ceil(moveRpx.value = e.detail.scrollLeft * moveLineWidth / width)
}

let moveLineWidth = 0
onMounted(() => {
	const {pixelRatio,screenWidth} = uni.getSystemInfoSync()
	moveLineWidth = Math.floor(screenWidth * 40 / 375 / 2)//可移动宽度
})
</script>

<style lang="scss" scoped>
.index-nav {
	margin-top: 16rpx;
	padding: 0 12rpx;
	box-sizing: border-box;
			.scroll-cate {
				white-space: nowrap;
				.cate-item {
					width: 20%;
					display: inline-block;
					.index-image {
						width: 100rpx;
						height: 100rpx;
					}
					.item-text {
						margin-top: 10rpx;
						font-size: 11px;
					}
				}
			}
			.scroll-line {
				justify-content: center;
				margin-top: 30rpx;
				.line {
					position: relative;
					height: 6rpx;
					width: 80rpx;
					background-color: #efefef;
					.move-line {
						position: absolute;
						top: 0;
						width: 50%;
						height: 100%;
						background-color: red;
					}
				}
			}
		}
</style>
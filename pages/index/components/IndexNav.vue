<template>
	<view class="index-nav">
		<scroll-view scroll-x="true" class="scroll-cate" @scroll="onNavScroll" show-scrollbar="false">
			<view class="cate-item flex-c" v-for="i in 10" :key="i">
				<view class="top-item flex-c-a">
					<image class="index-image" src="https://yanxuan.nosdn.127.net/c6fd8835a6400b7da7a016ad85506b69.png"></image>
					<view class="item-text">
						居家日用
					</view>
				</view>
				<view class="btm-item flex-c-a">
					<image class="index-image" src="https://yanxuan.nosdn.127.net/c6fd8835a6400b7da7a016ad85506b69.png"></image>
					<view class="item-text">
						居家日用
					</view>
				</view>
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
import { onMounted, ref } from 'vue';
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
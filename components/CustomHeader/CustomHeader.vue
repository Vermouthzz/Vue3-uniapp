<template>
	<view class="common-header flex">
		<view class="left-icon">
			<i class="iconfont icon-left" @tap="toBack"></i>
		</view>
		<view class="common-header-title" :class="{middle: props.middle}">
			{{title}}
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import {onReady} from '@dcloudio/uni-app'
import {middle} from '../../hooks/useMiddle.js'
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	middle: {
		type: Boolean,
		default: false
	},
	two: {
		type: Boolean,
		default: false
	}
})

const toBack = () => {
	uni.navigateBack({
		delta: 1,
		success: () => {
			if(props.two) {
				setTimeout(() => {
					uni.navigateBack()
				}, 250)
			}
		}
	})
}

let navBatHeight = ref(`0px`)
onReady(() => {
	// #ifdef MP
	middle().then(data => navBatHeight.value = `${data}px`)  //垂直居中
	// #endif
})
</script>

<style lang="scss">
.common-header {
	/* #ifdef APP */
	padding: 10rpx 0;
	align-items: center;
	/* #endif */
	/* #ifdef MP */
	line-height: v-bind(navBatHeight);
	/* #endif */
}
.middle {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
.left-icon {
	margin: 0 16rpx;
	.iconfont {
		font-size: 34rpx;
	}
}
</style>
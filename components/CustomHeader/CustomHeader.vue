<template>
	<view class="common-header flex" :style="{lineHeight: navBatHeight + 'px'}">
		<view class="left-icon" @tap="toBack">
			<van-icon name="arrow-left"></van-icon>
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

let navBatHeight = ref(0)
onReady(() => {
	middle().then(data => navBatHeight.value = data)  //垂直居中
})
</script>

<style lang="scss">
// .common-header {
	
// }
.middle {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
.left-icon {
	margin: 0 16rpx;
}
</style>
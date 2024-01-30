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
import { ref } from 'vue';
import {middle} from '../../hooks/middle.js'
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
	let num = 1
	if(props.two) num = 2
	uni.navigateBack({
		delta: num
	})
}

let navBatHeight = ref(0)
middle().then(data => navBatHeight.value = data)  //垂直居中

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
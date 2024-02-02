<template>
	<block v-if="open">
		<view class="container flex-c-a">
			<image @tap="toGoods" src="https://yanxuan-item.nosdn.127.net/712e114f766a31d9b8e1ab22dde10574.jpg" class="teleport-img"></image>
			<view class="cancel-btn">
				<van-icon color="#fbfbfb" @tap="onClose" size="52rpx" name="close" />
			</view>
		</view>
		<view class="mask" @tap="onClose"></view>
	</block>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['item'])
const open = ref(true)

const onClose = () => {
	open.value = false
}
 
const toGoods = () => {
	onClose()
	uni.navigateTo({
		url: `/indexpkg/goods/goods?id=${item.goods_id}`
	})
}
</script>

<style lang="scss" scoped>
.mask {
	position: absolute;
	width: 100vw;
	height: 100vh;
	z-index: 99;
	background-color: #7f7f7f;
	opacity: 0.5;
}
.container {
	position: absolute;
	top: 230rpx;
	left: 50%;
	transform: translateX(-50%);
	z-index: 999;
	.teleport-img {
		width: 630rpx;
		height: 840rpx;
		margin-bottom: 30rpx;
	}
}
</style>
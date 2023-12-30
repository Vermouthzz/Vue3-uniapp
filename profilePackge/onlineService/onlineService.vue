<template>
	<view class="online-service-block" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'在线客服'"></CustomHeader>
		<view class="online-server-body flex-c">
			<view class="sign">
				<text class="name">网易严选</text>
			</view>
			<scroll-view scroll-y="true" class="communicate">
				<view></view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
const {safeAreaInsets} = uni.getSystemInfoSync()
</script>

<style lang="scss">

.online-service-block {
	.online-server-body {
		
		.sign {
			height: 106rpx;
			background-color: #aa2c2a;
			.name {
				display: block;
				margin-left: 42rpx;
				font-size: 15px;
				color: #fff;
			}
		}
		.communicate {
			flex: 1;
		}
	}
}
</style>

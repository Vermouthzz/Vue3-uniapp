<template>
	<view class="safe-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'账号安全-网易严选'"></CustomHeader>
		<view class="safe-body">
			<view class="safe-item flex-a fff" v-if="false">
				<view class="item-left">
					设置支付密码
				</view>
				<view class="item-right">
					<van-icon name="arrow" size="30rpx"></van-icon>
				</view>
			</view>
			<block v-else>
				<view class="safe-item flex-a fff" v-for="(item,index) in list" :key="index">
					<view class="item-left">
						{{item.name}}
					</view>
					<view class="item-right">
						<van-icon name="arrow" size="32rpx"></van-icon>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const {safeAreaInsets} = uni.getSystemInfoSync()
const list = ref([
	{ name: '修改支付密码'},
	{ name: '忘记支付密码'},
	{ name: '开启/关闭个性化推荐'}
])
</script>

<style lang="scss">
.safe-block {
	height: 100vh;
	box-sizing: border-box;
	.safe-body {
		flex: 1;
		padding-top: 12rpx;
		background-color: #efefef;
		.safe-item {
			justify-content: space-between;
			padding: 20rpx 16rpx;
			border-bottom: 1px solid #cecece;
			font-size: 14px;
			&:last-child {
				border: 0;
			}
		}
	}
}
</style>

<template>
	<van-cell-group>
	  <!-- #ifdef MP -->
	  <van-field
	    :value="userInfo.account"
	    label="账号"
	  		readonly
	  />
	  <van-field
	    :value="userInfo.nickname"
	  		@change="onChangeName"
	    label="用户名"
	  />
	  <van-field
	    :value="userInfo.sign"
	    label="个性签名"
	  		@change="onChangeSign"
	  />
	  <view class="info-item flex">
	  	<view class="item-left">
	  		性别
	  	</view>
	  		<view class="item-right">
	  			<van-radio-group
	  			  :value="userInfo.gender"
	  			  @change="onChange"
	  			  direction="horizontal"
	  			>
	  			  <van-radio name="男">男</van-radio>
	  			  <van-radio name="女">女</van-radio>
	  			</van-radio-group>
	  		</view>
	  </view>
	  <!-- #endif -->
	  <!-- #ifdef APP -->
	  <van-field
	    v-model="userInfo.account"
	    label="账号"
	  		readonly
	  />
	  <van-field
	    v-model="userInfo.nickname"
	  		@change="onChangeName"
	    label="用户名"
	  />
	  <van-field
	    v-model="userInfo.sign"
	    label="个性签名"
	  		@change="onChangeSign"
	  />
	  <view class="info-item flex">
	  	<view class="item-left">
	  		性别
	  	</view>
	  		<view class="item-right">
	  			<van-radio-group
	  			  v-model="userInfo.gender"
	  			  direction="horizontal"
	  			>
	  			  <van-radio name="男">男</van-radio>
	  			  <van-radio name="女">女</van-radio>
	  			</van-radio-group>
	  		</view>
	  </view>
	  <!-- #endif -->
	</van-cell-group>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
	userInfo: {
		type: Object,
		default: {}
	}
})
const onChange = (e) => {
	props.userInfo.gender = e.detail
}
const onChangeName = (e) => {
	props.userInfo.nickname = e.detail
}
const onChangeSign = (e) => {
	props.userInfo.sign = e.detail
}
</script>

<style lang="scss">
	.info-item {
		padding: 20rpx 0;
		.item-left {
			margin-left: 34rpx;
			font-size: 14px;
			color: #646566;
		}
		.item-right {
			font-size: 14px;
			margin-left: 132rpx;
			color: #323233;
		}
	}
</style>
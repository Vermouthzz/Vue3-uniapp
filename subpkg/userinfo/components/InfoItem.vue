<template>
	<van-cell-group>
	  <van-field
	    value="1233"
	    label="账号"
		readonly
	  />
	  <van-field
	    value="hhh"
	    label="用户名"
	  />
	  <van-field
	    value="hhh"
	    label="个性签名"
	  />
	  <view class="info-item flex">
	  	<view class="item-left">
	  		性别
	  	</view>
		<view class="item-right">
			<van-radio-group
			  value="{{ radio }}"
			  @change="onChange"
			  direction="horizontal"
			>
			  <van-radio name="1">男</van-radio>
			  <van-radio name="2">女</van-radio>
			</van-radio-group>
		</view>
	  </view>
	  <view class="info-item flex">
	  	<view class="item-left">
	  		生日
	  	</view>
		<view class="item-right">
			<!-- <van-datetime-picker
			  type="date"
			  :value="11"
			  @input="onInput"
			/> -->
			<view v-if="false">{{11}}</view>
			<view class="placeholder" v-else>请选择日期</view>
		</view>
	  </view>
	</van-cell-group>
</template>

<script setup>
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
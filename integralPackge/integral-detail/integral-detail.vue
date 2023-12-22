<template>
	<view class="detail-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'积分明细'" :middle="true" />
		<view class="detail-block-body">
			<view class="integral flex-c-a">
				<text class="user-integral">我的积分</text>
				<text class="integral-num">{{user_integral}}</text>
			</view>
			<block v-if="integralChangeList.length">
				<view class="integral-detail flex-c">
					<view class="integral-item flex-a" v-for="(item,index) in integralChangeList" :key="index">
						<view class="item-left flex-c">
							<text>签到积分</text>
							<text class="date">{{item.change_time}}</text>
						</view>
						<view class="item-right" :style="{color: item.change_type ? '#8b4f18' : '#4096e6'}">
							{{item.change_type ? '+' : '-'}}{{item.change_num}}
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app'
import { computed, ref, watch } from 'vue';
import {getIntegralChangeAPI} from '../../api/integral.js'
const {safeAreaInsets} = uni.getSystemInfoSync()


const integralChangeList = ref([])
const user_integral = ref('')
const getChangeList = async () => {
	const res = await getIntegralChangeAPI()
	integralChangeList.value = res.result
	user_integral.value = res.integral
}
onLoad((options) => {
	getChangeList()
})
</script>

<style lang="scss">
.detail-block {
	height: 100vh;
	box-sizing: border-box;
	.detail-block-body {
		flex: 1;
		padding: 0 20rpx;
		margin-top: 20rpx;
		.integral {
			width: 100%;
			height: 240rpx;
			justify-content: center;
			background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
			border-radius: 24rpx;
			.user-integral {
				font-size: 13px;
				color: #966e07;
			}
			.integral-num {
				margin-top: 12rpx;
				font-size: 20px;
				color: #8b4f18;
			}
		}
		.integral-detail {
			.integral-item {
				justify-content: space-between;
				padding: 16rpx 0;
				border-bottom: 1px solid #dadada;
				font-size: 13px;
				.item-left {
					.date {
						margin-top: 4rpx;
						color: #969696;
						font-size: 12px;
					}
				}
				.item-right {
					color: #f37f2b;
				}
			}
		}
	}
}
</style>

<template>
	<view class="ba-detail-block flex-c" :style="{paddingTop: safeAreaInsets.top + 'px'}">
		<CustomHeader :title="'网易严选-以严谨的态度...'"></CustomHeader>
		<view class="ba-detail-body">
			<view class="detail-item-block flex-c">
				<view class="item-date">
					2023.12.04 23:09:01
				</view>
				<view class="item-detail fff flex">
					<view class="item-left flex-c">
						<view class="item-card flex-a">
							<text class="name">卡号:</text>
							<text class="id">202012321009A</text>
						</view>
						<view class="item-order flex-a">
							<text class="name">订单:</text>
							<text class="id">--</text>
						</view>
					</view>
					<view class="item-right flex">
						<view class="item-name flex-c">
							<text>充值</text>
							<text class="btm">余额</text>
						</view>
						<view class="item-change flex-c">
							<text class="sign">+1.03</text>
							<text class="btm">1.03</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {getCardDetailAPI} from '../../api/card.js'
const {safeAreaInsets} = uni.getSystemInfoSync()

const cardList = ref([])
const getCardList = async () => {
	const res = await getCardDetailAPI(1)
	cardList.value = res.data
}

onMounted(() => {
	getCardList()
})
</script>

<style lang="scss">
.ba-detail-block {
	height: 100vh;
	box-sizing: border-box;
	.ba-detail-body {
		flex: 1;
		background-color: #efefef;
		.detail-item-block {
			font-size: 13px;
			.item-date {
				text-align: center;
				margin: 8rpx 0;
			}
			.item-detail {
				padding: 24rpx 36rpx;
				.item-left {
					flex: 2;
					color: #656565;
					.name {
						margin-right: 10rpx;
					}
					.item-card {
						margin-bottom: 10rpx;
					}
				}
				.item-right {
					flex: 1;
					justify-content: space-between;
					.sign {
						margin-left: -20rpx;
					}
					.btm {
						margin-top: 10rpx;
					}
				}
			}
		}
	}
}
</style>

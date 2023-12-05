<template>
	<view class="love-block">
		<slot name="title"></slot>
		<view class="love-list">
			<view class="love-list-item" v-for="o in 6" :key="o">
				<GoodsItem></GoodsItem>
			</view>
		</view>
	</view>
</template>

<script>
import GoodsItem from '../GoodsItem/GoodsItem.vue'
</script>

<style lang="scss">
	.love-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 12px;
		padding: 0 ;
		background-color: #fff;
		box-sizing: border-box;
		.love-list {
			display: flex;
			flex-wrap: wrap;
			// padding: 0 8px;
			.love-list-item {
				width: 45%;
				margin: 0 6px 24px 10px;
			}
		}
	}
</style>
<template>
	<van-swipe-cell  class="adress-item-block" :right-width="65" :async-close="true" @close="onCloseSwipe">
		<van-cell-group>
			<view class="adress-item flex-a" @tap="onTapItem" @longpress="handelLongpress">
				<view class="adress-item-left flex-c">
					<view class="item-left-top flex-a">
						<view class="small-view default" v-if="props.list.is_default == 1">
							默认
						</view>
						<view class="small-view">
							{{props.list.tag}}
						</view>
						<view class="adress-area">
							{{props.list.address}}
						</view>
					</view>
					<view class="item-left-adress">
						<text class="adress-detail">{{list.detail_adrs}}</text>
					</view>
					<view class="item-left-people flex-a">
						<text class="name">{{list.name}}</text>
						<text class="phone-number">{{phoneNumber}}</text>
					</view>
				</view>
				<view class="adress-item-right" >
					<van-icon name="edit" size="42rpx" @tap="toEdit()" />
				</view>
			</view>
		</van-cell-group>
		<view slot="right" class="btn-del flex-a" @tap="onDelAddres">删除</view>
	</van-swipe-cell>
	<van-dialog
	  use-slot
	  title="确认删除"
	  :show="show"
	  show-cancel-button
	  @close="onClose"
	>
	</van-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import {useAddressStore} from '../../../store/useAddressStore.js'
const addressStore = useAddressStore()
const props = defineProps(['list'])
const show = ref(false)

const phoneNumber = computed(() => {
	// return props.list.contact.replace(/^(\d{3})(\d{4})(\d{4})/, '$1****$2')
	return props.list.contact.substring(0,4) + '****' + props.list.contact.substring(8)
})
const onDelAddres = () => {
	show.value = true
}
const onCloseSwipe = (e) => {
	const {instance} = e.detail
	instance.close()
}

const onTapItem = () => {
	addressStore.tapAddress(props.list.addres_id)
}
const handelLongpress = () => {
	console.log(1111);
}

const toEdit = () => {
	uni.navigateTo({
		url: `/profilePackge/add-edit/add-edit?type=2&id=${props.list.addres_id}`
	})
}

const onClose = (e) => {
	//点击确认按钮
	if(e.detail == 'confirm') {
		// addressStore.delAddress(props.list.addres_id)
	}
	show.value = false
}
</script>

<style lang="scss" scoped>
	.adress-item-block {
		.adress-item {
			justify-content: space-between;
			padding-bottom: 26rpx;
			border-bottom: 1px solid #bbb;
			.adress-item-left {
				justify-content: space-between;
				.item-left-top {
					.small-view {
						padding: 2rpx 4rpx;
						margin-right: 12rpx;
						color: #fff;
						background-color: #4c83f3;
						border: 1px solid #4c83f3;
						border-radius: 6rpx;
						font-size: 10px;
					}
					.default {
						background-color: #f34804;
						border: 1px solid #f34804;
					}
					.adress-area {
						color: #8b8b8b;
						font-size: 12px;
					}
				}
				.item-left-adress {
					margin: 14rpx 0;
					.adress-detail {
						font-size: 16px;
						font-weight: 600;
					}
				}
				.item-left-people {
					font-size: 14px;
					color: #8b8b8b;
					.name {
						margin-right: 14rpx;
					}
				}
			}
			.adress-item-right {
				margin-left: 30rpx;
			}
		}
	}
</style>
<template>
	<view class="popup">
		<van-popup :show="props.show" position="bottom" @close="onClose" closeable>
			<view class="popup-content flex-c">
				<view class="popup-top-item-block">
					<view class="popup-top-item flex">
						<view class="top-item-img">
							<image class="top-item-image" :src="selectSku?.pic || props.goods?.goods_img"></image>
						</view>
						<view class="top-item-pro flex-c">
							<view class="promotion">
								{{props.goods?.service.name}}
							</view>
							<text class="red-price">价格:￥{{selectSku?.price || props.goods.goods_price}}</text>
							<text>已选择:{{selectName ? selectName: '请选择规格'}}</text>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" class="scroll-popup">
					<view class="popup-body flex-c">
						<block v-for="item in props.goods?.sku_list" :key="item.name">
							<view class="top">
								{{item.name}}
							</view>
							<view class="body-item-block flex">
								<view class="body-item" v-for="(subItem,index) in item.value" :key="index"
									@tap="onSelectSku(subItem,item.value)"
									:class="{border_active: subItem.selected,disabled: subItem.disabled}">
									{{subItem.name}}
								</view>
							</view>
						</block>
						<view class="body-num flex-c">
							<text class="num-block">数量</text>
							<van-stepper :value="num" @change="changeValue" />
						</view>
					</view>
				</scroll-view>
				<view class="btn-submit" @tap="onSubmitSku('confirm')" v-if="isCart">
					确定
				</view>
				<view class="goods-btn flex" v-else>
					<button class="add-cart common-btns" @tap="onSubmitSku('add')">加入购物车</button>
					<button class="buy-goods common-btns" @tap="onSubmitSku('buy')">立即购买</button>
				</view>
			</view>
		</van-popup>
	</view>
</template>

<script setup>
	import {
		computed,
		ref,
		watchEffect
	} from "vue"
	import mitter from '../../utils/mitt.js'
	import Set from '../../hooks/Set.js'
	import {
		useCartStore
	} from '../../store/useCartStore.js'
	import {
		useCreateOrderStore
	} from '../../store/useCreateOrderStore.js'
	import {
		useTicketStore
	} from '../../store/useTicketStore.js'
	const emits = defineEmits(['update:show'])
	const cartStore = useCartStore()
	const createOrderStore = useCreateOrderStore()
	const ticketStore = useTicketStore()
	const props = defineProps(['goods', 'isCart', 'show'])
	const num = ref(1)
	let pathMap = {}
	const selectName = ref('')
	watchEffect(() => {
		if (Object.values(props.goods).length) {
			pathMap = getEffectiveList(props.goods?.sku)
			initDisabledStatus(props.goods?.sku_list, pathMap)
			if (props.isCart) initSelectitem()
			selectName.value = getSelectedArr(props.goods?.sku_list).join('')
		}
	})

	const initSelectitem = () => {
		let items = cartStore.cartList.find(item => item.item_id == props.goods.item_id)
		if (items) {
			num.value = items.count
			for (let key in props.goods.sku_list) {
				props.goods.sku_list[key].value.forEach(item => {
					if (item.name == items.spec[key].value) {
						item.selected = true
					}
				})
			}
			getSelectedSku()
		}
	}

	const onSubmitSku = async (type) => {
		if (Object.values(selectSku).length === 0) {
			uni.showToast({
				icon: 'error',
				title: '请选择规格'
			})
			return
		}
		switch (type) {
			case 'add':
				let obj = {
					count: num.value,
					checked: true,
					sku_id: selectSku.id,
					goods_id: selectSku.goods_id,
				}
				cartStore.addCart(obj)
				break
			case 'confirm':
				let item = {
					count: num.value,
					selected: true,
					sku_id: selectSku.id,
					item_id: props.goods.item_id
				}
				cartStore.updateCart(item)
				break
			case 'buy':
				createOrderStore.getCreateOrderInfo(selectSku.id, num.value)
				//进入创建订单页之前，选中最佳红包
				ticketStore.optimalTicket(selectSku.retail_price, 'selected', props.goods?.service.id)
				uni.navigateTo({
					url: `/profilePackge/create-order/create-order?id=${selectSku.id}&count=${num.value}`
				})
				break
		}
		onClose()
	}
	//弹出层实例
	const onClose = () => {
		mitter.emit('selectName', selectName.value)
		emits('update:show', false)
	}
	const changeValue = (e) => {
		num.value = e.detail
	}
	//获取有效sku组合
	const sign = '★'
	const getEffectiveList = (skus) => {
		skus?.forEach(item => {
			if (item.stock > 0) {
				//获取有效集合名字
				let spec = item.spec.map(i => i.value)
				let powerSet = Set(spec)
				powerSet?.forEach(set => {
					const key = set.join(sign)
					//不存在则初始化为[]
					if (!pathMap[key]) {
						pathMap[key] = []
					}
					pathMap[key].push(item.id)
				})
			}
		})
		return pathMap
	}
	//单击选中逻辑
	let selectSku = {}
	const onSelectSku = (item, list) => {
		if (item.disabled) return
		// skuIndex.value = index
		if (item.selected) {
			//再次点击取消逻辑
			item.selected = false
		} else {
			// 首次点击选择逻辑
			list?.forEach(i => i.selected = false)
			item.selected = true
		}
		updateDisabledStatus(props.goods.sku_list, pathMap)
		getSelectedSku()
	}

	const getSelectedSku = () => {
		const selectArr = getSelectedArr(props.goods.sku_list).filter(i => i != '') //过滤掉undefined
		//如果选中对象集合长度等于规格长度
		if (selectArr.length === props.goods.sku_list?.length) {
			const skuId = pathMap[selectArr.join(sign)][0]
			selectSku = props.goods.sku.find(item => item.id === skuId)
		} else {
			selectSku = {}
		}
	}

	const currentSku = computed(() => {
		return Object.values(selectSku).length ? selectSku : {
			pic: props.goods.goods_img,
			price: props.goods.goods_price
		}
	})
	//得到当前选中集合
	const getSelectedArr = (skuList) => {
		let selectedArr = []
		skuList?.forEach((item, index) => {
			// 用index的原因是为了确保位置在正确的位置上
			const selectedVal = item.value.find(i => i.selected)
			if (selectedVal) {
				selectedArr[index] = selectedVal.name
			} else {
				selectedArr[index] = ''
			}
		})
		return selectedArr
	}
	//初始化disabled状态
	const initDisabledStatus = (specs, pathMap) => {
		if (specs && pathMap.length > 0) {
			specs?.forEach((item) => {
				item.disabled = !pathMap[item.name]
			})
		}
	}
	//更新选中disabled状态
	const updateDisabledStatus = (skuList, pathMap) => {
		//遍历每一种规格
		skuList?.forEach((item, index) => {
			const selectArr = getSelectedArr(skuList)
			//遍历每一个按钮
			item.value?.forEach(i => {
				if (!i.selected) { //未选中
					selectArr[index] = i.name
					//去掉undifened
					const key = selectArr.filter(val => val).join(sign)
					i.disabled = !pathMap[key]
				}
			})
		})
	}
</script>

<style lang="scss">
	.popup {
		.popup-content {
			padding: 24rpx 0 0;
			height: 660rpx;

			.popup-top-item-block {
				height: 92px;
				padding: 0 20rpx;

				.popup-top-item {
					.top-item-img {
						.top-item-image {
							width: 160rpx;
							height: 160rpx;
						}
					}

					.top-item-pro {
						font-size: 12px;
						margin-left: 16rpx;
						padding-top: 70rpx;

						.promotion {
							width: fit-content;
							padding: 4rpx 6rpx;
							border-radius: 10rpx;
							font-size: 10px;
							color: #a52c46;
							background-color: #faece9;
						}

						.red-price {
							color: #a13142;
						}
					}
				}
			}

			.scroll-popup {
				flex: 1;
				overflow: scroll;

				.popup-body {
					padding: 0 20rpx 24rpx;

					.top {
						font-size: 12px;
						margin-bottom: 10rpx;
					}

					.body-item-block {
						flex-wrap: wrap;

						.body-item {
							border: 1px solid #aaa;
							padding: 10rpx 12rpx;
							font-size: 12px;
							margin-right: 16rpx;
							margin-bottom: 30rpx;

							&.border_active {
								color: #a22b37;
								border: 1px solid #a22b37;
							}

							&.disabled {
								color: #858585;
								border: 1px dotted #d9d9d9;
							}
						}
					}

					.body-num {
						font-size: 12px;

						.num-block {
							margin-bottom: 20rpx;
						}
					}
				}
			}

			.btn-submit {
				width: 100vw;
				height: 68rpx;
				font-size: 24rpx;
				color: #fff;
				background-color: #c43043;
				text-align: center;
				padding: 20rpx 0;
				z-index: 101;
			}

			.goods-btn {
				width: 100%;
				height: 100rpx;
				justify-content: space-between;
				padding: 20rpx;
				box-sizing: border-box;

				.common-btns {
					width: 320rpx;
					height: 60rpx;
					line-height: 60rpx;
					color: #fff;
					font-size: 14px;
					text-align: center;
					border-radius: 50rpx;
				}
			}
		}
	}
</style>
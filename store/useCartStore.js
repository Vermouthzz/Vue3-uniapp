import { defineStore } from 'pinia'
import {ref, computed} from 'vue'
import {getCartListAPI, addCartAPI, delCartAPI, updateCartAPI} from '../api/cart.js'
import {useTicketStore} from './useTicketStore.js'

export const useCartStore = defineStore('cart',() => {
	//-------------state----------------
	const ticketStore = useTicketStore()
	const cartList = ref([])
	const ticketPrice = ref(0)
	
	
	//-----------getter-------------
	const itemValues = computed(() => cartList.value.flat().reduce((acc, curr) => [...acc,...curr.value], []))
	const selectedItems = computed(() => itemValues.value.filter(i => i.selected).reduce((a,b) => {
		if(!a[b.goods_id]) {
		    a[b.goods_id] = []
		  }
		  a[b.goods_id].push(b)
		  return a
	}, []).filter(v => true))
	//底部全选和取消全选
	const allChecked = computed(() => cartList.value.every(i => i[0].value.every(subI => subI.selected)))
	const onAllChange = (val) => {
		cartList.value.forEach(item => item[0].value.forEach(subItem => subItem.selected = val))
		updateCart(itemValues.value)
	}
	//选中商品原价总和
	const allRetailPrice = computed(() => itemValues.value.filter(i => i.selected).reduce((acc, curr) => acc + curr.sku_item.retail_price * curr.count, 0))
	//选中商品零售价格总和
	const allPrice = computed(() => itemValues.value.filter(i => i.selected).reduce((acc, curr) => acc + curr.sku_item.price * curr.count, 0))
	
	//每个选中的购物车item需要减去的值(当找到有用的红包并且适用所有商品时)
	const serviceIds = computed(() => itemValues.value.map(item => item.sku_item.service_id))
	const reNum = computed(() => {
		const price = ticketStore.OptimalPrice(allRetailPrice.value, serviceIds.value)
		ticketPrice.value = price
		if(price > 0) {
			return (price / selectedItems.value.length).toFixed(2)
		} else {
			return price
		}
	})
	
	
	//----------------action----------------
	//添加购物车
	const addCart = async (obj) => {
		let item = cartList.value.find(item => item.item_id == obj.item_id)
		if(item) {
			obj.count += item.count
			await updateCartAPI([{id:item.item_id,count: obj.count, sku_id: item.sku_id, selected: item.selected}])
		} else {
			await addCartAPI(obj)
		}
		getCartList()
	}
	//获取购物车列表
	const getCartList = async () => {
		const res = await getCartListAPI()
		cartList.value = res
	}
	//删除购物车
	const delCartItem = async (id) => {
		uni.showLoading({ mask: true })
		const res = await delCartAPI(id)
		if(res) uni.hideLoading()
		getCartList()
	}
	//更新购物车
	const updateCart = async (cartItem) => {
		uni.showLoading({ mask: true })
		const res = await updateCartAPI(cartItem)
		if(res) uni.hideLoading()
		getCartList()
	}
	

	return {
		cartList,
		allChecked,
		allPrice,
		addCart,
		getCartList,
		updateCart,
		onAllChange,
		delCartItem,
		selectedItems,
		itemValues,
		allRetailPrice,
		reNum,
		ticketPrice,
	}
})
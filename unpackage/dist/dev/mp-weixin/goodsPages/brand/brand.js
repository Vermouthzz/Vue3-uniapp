"use strict";const e=require("../../common/vendor.js"),p=require("../../api/goods.js");require("../../request/index.js");require("../../store/useUserStore.js");Array||e.resolveComponent("CustomHeader")();const m=()=>"../../components/CustomHeader/CustomHeader.js";Math||(m+b+f+v)();const v=()=>"../../components/GoodsItem/GoodsItem.js",f=()=>"./components/BrandTab.js",b=()=>"./components/BrandDesc.js",g={__name:"brand",setup(d){const{safeAreaInsets:u}=e.index.getSystemInfoSync(),c=e.ref(0),l=o=>{c.value=o.detail.scrollTop},t=e.ref(1);e.watchEffect(()=>{switch(t.value){case 1:a.value=a.value.sort((o,s)=>o.sort-s.sort);break;case 2:a.value=a.value.sort((o,s)=>o.goods_price-s.goods_price);break;case 3:a.value=a.value.sort((o,s)=>s.goods_price-o.goods_price);break;case 4:a.value=a.value.sort((o,s)=>s.sale-o.sale)}});const n=e.ref({}),a=e.ref([]),_=async o=>{const s=await p.getBrandGoodsAPI(o);n.value=s.data.brand_info,a.value=s.data.brand_goods};return e.onLoad(o=>{_(o.id)}),(o,s)=>({a:e.p({title:n.value.brand_name}),b:e.p({brandInfo:n.value}),c:e.o(r=>t.value=r),d:e.p({scrollTop:c.value,type:t.value}),e:e.f(a.value,(r,I,i)=>({a:"b2e60166-3-"+i,b:e.p({goodsItem:r}),c:r.goods_id})),f:e.o(l),g:e.unref(u).top+"px"})}},y=e._export_sfc(g,[["__file","D:/github/app-unis/goodsPages/brand/brand.vue"]]);wx.createPage(y);

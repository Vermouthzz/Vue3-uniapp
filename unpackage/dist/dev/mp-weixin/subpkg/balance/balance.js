"use strict";const e=require("../../common/vendor.js"),t=require("../../store/useUserCardStore.js");require("../../api/user.js");require("../../request/index.js");require("../../store/useUserStore.js");require("../../store/useCartStore.js");require("../../api/cart.js");Array||e.resolveComponent("van-icon")();Math||(s+a)();const s=()=>"../card/header.js",a=()=>"../../components/LoveList/LoveList.js",c={__name:"balance",setup(r){const n=t.useUserCardStore(),{safeAreaInsets:o}=e.index.getSystemInfoSync();return(u,_)=>({a:e.p({title:"我的余额"}),b:e.t(e.unref(n).userBalance.num),c:e.p({name:"arrow",size:"24rpx"}),d:e.unref(o).top+"px"})}},i=e._export_sfc(c,[["__file","D:/github/app-unis/subpkg/balance/balance.vue"]]);wx.createPage(i);
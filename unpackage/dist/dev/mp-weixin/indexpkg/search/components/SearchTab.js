"use strict";const e=require("../../../common/vendor.js");Array||e.resolveComponent("van-icon")();const p={__name:"SearchTab",setup(t){const o=e.ref(!1),n=e.inject("type"),r=a=>{a=="price"?(o.value?n.value=3:n.value=2,o.value=!o.value):n.value=a};return(a,u)=>({a:e.o(c=>r(1)),b:e.unref(n)==1?"#a02f40":"",c:e.unref(n)==2||e.unref(n)==3?"#a02f40":"",d:e.p({name:"arrow-up",size:"24rpx",color:e.unref(n)==2?"#a02f40":""}),e:e.p({name:"arrow-down",size:"24rpx",color:e.unref(n)==3?"#a02f40":""}),f:e.o(c=>r("price")),g:e.o(c=>r(4)),h:e.unref(n)==4?"#a02f40":""})}},s=e._export_sfc(p,[["__file","D:/github/app-unis/indexpkg/search/components/SearchTab.vue"]]);wx.createComponent(s);

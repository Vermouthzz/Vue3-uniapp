"use strict";const e=require("../../../common/vendor.js");Array||e.resolveComponent("van-icon")();const u={__name:"BrandTab",props:["scrollTop","type"],emits:["update:type"],setup(p,{emit:s}){const n=p,a=e.ref(!1),o=e.ref(1),t=r=>{r=="price"?(a.value?o.value=3:o.value=2,a.value=!a.value):o.value=r,s("update:type",o.value)};return(r,i)=>({a:e.o(c=>t(1)),b:n.type==1?"#a02f40":"",c:o.value==2||o.value==3?"#a02f40":"",d:e.p({name:"arrow-up",size:"24rpx",color:o.value==2?"#a02f40":""}),e:e.p({name:"arrow-down",size:"24rpx",color:o.value==3?"#a02f40":""}),f:e.o(c=>t("price")),g:e.o(c=>t(4)),h:n.type==4?"#a02f40":"",i:e.n(n.scrollTop>170?"fixed":"")})}},l=e._export_sfc(u,[["__file","D:/github/app-unis/goodsPages/brand/components/BrandTab.vue"]]);wx.createComponent(l);
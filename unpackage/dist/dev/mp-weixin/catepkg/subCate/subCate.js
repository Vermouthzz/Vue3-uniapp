"use strict";const e=require("../../common/vendor.js"),b=require("../../hooks/useMiddle.js"),g=require("../../api/subcate.js");require("../../request/index.js");require("../../store/useUserStore.js");require("../../api/user.js");Array||e.resolveComponent("van-icon")();Math||h();const h=()=>"../../components/GoodsItem/GoodsItem.js",m={__name:"subCate",setup(d){const r=e.ref("标题"),u=e.ref(),_=()=>{e.index.navigateBack()},c=e.ref([]),l=async o=>{const a=await g.getSubcateListAPI(o);c.value=a.result},n=e.ref(),v=(o,a)=>{n.value=o.id};return e.onLoad(o=>{n.value=o.goods_id,r.value=o.title,b.useMiddle(".subcate-header-top").then(a=>{u.value=a.top}),l({...o})}),(o,a)=>({a:e.p({name:"arrow-left"}),b:e.o(_),c:e.t(r.value),d:e.f(c.value,(t,p,i)=>({a:e.t(t.name),b:t.id,c:e.o(s=>v(t),t.id),d:n.value==t.id?1:""})),e:u.value+"px",f:e.f(c.value,(t,p,i)=>({a:e.t(t.name),b:e.f(t.children,(s,q,f)=>({a:"947939c4-1-"+i+"-"+f,b:e.p({goodsItem:s}),c:s.goods_id})),c:t.id,d:n.value==t.id}))})}},x=e._export_sfc(m,[["__file","D:/github/app-unis/catepkg/subCate/subCate.vue"]]);wx.createPage(x);

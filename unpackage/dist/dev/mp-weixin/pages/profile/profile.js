"use strict";const e=require("../../common/vendor.js"),_=require("../../store/useUserStore.js"),g=()=>{const t=e.ref([{id:1,name:"礼品卡",is_dollar:!1,path:"/subpkg/card/card"},{id:2,name:"余额",is_dollar:!0,path:"/subpkg/balance/balance"},{id:3,name:"红包",is_dollar:!1,path:"/subpkg/redPacket/redPacket"},{id:4,name:"优惠券",is_dollar:!1,path:"/subpkg/redPacket/redPacket"}]),r=e.ref([{id:1,name:"全部订单",icon:"orders-o"},{id:2,name:"待付款",icon:"paid"},{id:3,name:"待发货",icon:"pending-payment"},{id:4,name:"已发货",icon:"logistics"},{id:4,name:"待评价",icon:"records-o"}]),i=e.ref([{id:1,name:"地址管理",icon:"location-o",path:"/subpkg/Address/Address"},{id:1,name:"账号安全",icon:"shield-o",path:"/subpkg/Address/Address"},{id:1,name:"账号关联",icon:"link-o",path:"/subpkg/Address/Address"},{id:1,name:"我的手机号",icon:"phone-o",path:"/subpkg/Address/Address"},{id:1,name:"加好友交流",icon:"friends-o",path:"/subpkg/Address/Address"}]);return{quoteList:t,orderList:r,serviceList:i}};if(!Array){const t=e.resolveComponent("van-icon"),r=e.resolveComponent("uni-card");(t+r)()}Math||(v+b)();const b=()=>"../../components/LoveList/LoveList.js",v=()=>"./components/ProfileHeader.js",h={__name:"profile",setup(t){const{quoteList:r,orderList:i,serviceList:p}=g();_.useUserStore();const d=e.ref(!1),u=n=>{n.detail.scrollTop>200?d.value=!0:d.value=!1},l=n=>{e.index.navigateTo({url:`/subpkg/order/order?index=${n}`})},f=n=>{e.index.navigateTo({url:n})},m=n=>{e.index.navigateTo({url:n})};return e.onLoad(()=>{}),(n,L)=>({a:e.p({flag:d.value}),b:e.f(e.unref(r),(o,s,a)=>({a:o.is_dollar?1:"",b:e.t(o.name),c:s,d:e.o(c=>m(o.path),s)})),c:e.f(e.unref(i),(o,s,a)=>({a:"7ba2d379-2-"+a+",7ba2d379-1",b:e.p({name:o.icon,size:"60rpx"}),c:e.t(o.name),d:s,e:e.o(c=>l(s),s)})),d:e.p({["is-full"]:!0,["is-shadow"]:!0}),e:e.f(e.unref(p),(o,s,a)=>({a:"7ba2d379-3-"+a,b:e.p({name:o.icon,color:"#f98a68",size:"42rpx"}),c:e.t(o.name),d:e.o(c=>f(o.path),o.icon),e:o.icon})),f:e.f(5,(o,s,a)=>({a:o})),g:e.o(u)})}},k=e._export_sfc(h,[["__file","D:/github/app-unis/pages/profile/profile.vue"]]);wx.createPage(k);

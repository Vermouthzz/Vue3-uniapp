"use strict";const e=require("../../common/vendor.js"),_=require("../../store/useUserStore.js"),h=require("../../store/useUserCardStore.js");require("../../api/user.js");require("../../request/index.js");require("../../store/useCartStore.js");require("../../api/cart.js");const v=()=>{var s;const n=h.useUserCardStore(),i=e.ref([{id:1,name:"礼品卡",is_dollar:!1,path:"/profilePackge/card/card",num:n.userCard.length},{id:2,name:"余额",is_dollar:!0,path:"/profilePackge/balance/balance",num:n.userBalance.num},{id:3,name:"红包",is_dollar:!1,path:"/profilePackge/redPacket/redPacket",num:((s=n.userTicketList[0])==null?void 0:s.length)||0},{id:4,name:"优惠券",is_dollar:!1,path:"/profilePackge/redPacket/redPacket",num:0}]),c=e.ref([{id:1,name:"全部订单",icon:"orders-o"},{id:2,name:"待付款",icon:"paid"},{id:3,name:"待发货",icon:"pending-payment"},{id:4,name:"已发货",icon:"logistics"},{id:4,name:"待评价",icon:"records-o"}]),d=e.ref([{id:1,name:"地址管理",icon:"location-o",path:"/profilePackge/Address/Address"},{id:2,name:"账号安全",icon:"shield-o",path:"/profilePackge/ProfileSafe/ProfileSafe"},{id:3,name:"账号关联",icon:"link-o",path:"/profilePackge/Address/Address"},{id:4,name:"我的手机号",icon:"phone-o",path:"/profilePackge/Address/Address"},{id:5,name:"加好友交流",icon:"friends-o",path:"/profilePackge/Address/Address"},{id:6,name:"积分乐园",icon:"award-o",path:"/profilePackge/integral/integral"}]);return{quoteList:i,orderList:c,serviceList:d}};if(!Array){const n=e.resolveComponent("van-icon"),i=e.resolveComponent("uni-card");(n+i)()}Math||(b+L+k)();const k=()=>"../../components/PasswordPopup/PasswordPopup.js",L=()=>"../../components/LoveList/LoveList.js",b=()=>"./components/ProfileHeader.js",q={__name:"profile",setup(n){const{quoteList:i,orderList:c,serviceList:d}=v();_.useUserStore();const s=e.ref(!1),p=r=>{r.detail.scrollTop>200?s.value=!0:s.value=!1},l=e.ref(!1),f=()=>{l.value=!0},m=r=>{e.index.navigateTo({url:`/profilePackge/order/order?index=${r}`})},P=r=>{e.index.navigateTo({url:r})},g=r=>{e.index.navigateTo({url:r})};return e.onLoad(()=>{}),(r,S)=>({a:e.p({flag:s.value}),b:e.f(e.unref(i),(o,a,t)=>({a:e.t(o.num),b:o.is_dollar?1:"",c:e.t(o.name),d:a,e:e.o(u=>g(o.path),a)})),c:e.f(e.unref(c),(o,a,t)=>({a:"7ba2d379-2-"+t+",7ba2d379-1",b:e.p({name:o.icon,size:"60rpx"}),c:e.t(o.name),d:a,e:e.o(u=>m(a),a)})),d:e.p({["is-full"]:!0,["is-shadow"]:!0}),e:e.f(e.unref(d),(o,a,t)=>({a:"7ba2d379-3-"+t,b:e.p({name:o.icon,color:"#f98a68",size:"42rpx"}),c:e.t(o.name),d:e.o(u=>P(o.path),o.icon),e:o.icon})),f:e.f(5,(o,a,t)=>({a:e.o(f,o),b:o})),g:e.o(p),h:e.o(o=>l.value=o),i:e.p({show:l.value})})}},A=e._export_sfc(q,[["__file","D:/github/app-unis/pages/profile/profile.vue"]]);wx.createPage(A);

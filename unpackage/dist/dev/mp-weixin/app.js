"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("./common/vendor.js"),i=require("./store/useUserStore.js"),c=require("./store/useAddressStore.js"),n=require("./store/useCartStore.js"),p=require("./store/useUserCardStore.js"),s=require("./store/index.js");require("./api/address.js");require("./request/index.js");require("./api/cart.js");require("./api/user.js");const d={onLaunch:async function(){const e=i.useUserStore();if(e.userInfo){const a=c.useAddressStore(),t=n.useCartStore();p.useUserCardStore().getUserCardInfo(e.userInfo.user_id),a.getAddresList(),await t.getCartList()}console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){r.index.pageScrollTo({scrollTop:1,duration:0})}},l=r._export_sfc(d,[["__file","D:/github/app-unis/App.vue"]]);function o(){const e=r.createSSRApp(l);return e.use(s.pinia),{app:e,pinia:s.pinia}}o().app.mount("#app");exports.createApp=o;

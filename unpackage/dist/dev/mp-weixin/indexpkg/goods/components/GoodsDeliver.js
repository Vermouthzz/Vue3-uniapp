"use strict";const e=require("../../../common/vendor.js"),l=require("../../../utils/mitt.js"),A=require("../../../api/goods.js"),g=require("../../../store/useAddressStore.js");require("../../../request/index.js");require("../../../store/useUserStore.js");require("../../../api/address.js");if(!Array){const r=e.resolveComponent("van-checkbox"),n=e.resolveComponent("van-action-sheet");(r+n)()}Math||w();const w=()=>"../../../components/GoodsPopop/GoodsPopop.js",q={__name:"GoodsDeliver",setup(r){const n=r,t=g.useAddressStore(),a=e.ref("");l.mitter.on("selectName",o=>{a.value=o});const u=e.ref([]),d=e.ref(!1),_=async()=>{const o=await A.getSkuListAPI(n.id);u.value=o.data,l.mitter.emit("popup",{isCart:!1}),d.value=!0},c=e.ref(!1),i=(o="open")=>{o=="close"?c.value=!1:c.value=!0},v=(o,p)=>{t.tapAddress(p.addres_id,o.detail,"change")},f=e.computed(()=>t.storeAddress?t.storeAddress.address.split(" ").join(""):"请选择配送区域");return(o,p)=>({a:e.t(a.value?a.value:"请选择规格"),b:e.o(_),c:e.t(e.unref(f)),d:e.o(i),e:e.o(s=>d.value=s),f:e.p({goods:u.value,show:d.value}),g:e.f(e.unref(t).addressList,(s,k,h)=>({a:e.t(s.address.split(" ").join("")),b:e.o(m=>v(m,s),s.addres_id),c:"1ace722e-2-"+h+",1ace722e-1",d:e.p({value:s.selected}),e:s.addres_id})),h:e.o(s=>i("close")),i:e.p({show:c.value,title:"配送至",round:!1})})}},S=e._export_sfc(q,[["__file","D:/github/app-unis/indexpkg/goods/components/GoodsDeliver.vue"]]);wx.createComponent(S);

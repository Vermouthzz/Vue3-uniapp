"use strict";const e=require("../../../common/vendor.js"),m=require("../../../store/useAddressStore.js");require("../../../api/address.js");require("../../../request/index.js");require("../../../store/useUserStore.js");if(!Array){const o=e.resolveComponent("van-icon"),t=e.resolveComponent("van-cell-group"),r=e.resolveComponent("van-swipe-cell"),s=e.resolveComponent("van-dialog");(o+t+r+s)()}const v={__name:"AddressItem",props:["list"],setup(o){const t=o,r=m.useAddressStore(),s=e.ref(!1),c=e.computed(()=>t.list.contact.substring(0,4)+"****"+t.list.contact.substring(8)),a=()=>{s.value=!0},d=n=>{const{instance:i}=n.detail;i.close()},l=()=>{r.tapAddress(t.list.addres_id)},u=()=>{console.log(1111)},p=()=>{e.index.navigateTo({url:`/subpkg/add-edit/add-edit?type=2&id=${t.list.addres_id}`})},_=n=>{n.detail=="confirm",s.value=!1};return(n,i)=>e.e({a:t.list.is_default==1},t.list.is_default==1?{}:{},{b:e.t(t.list.tag),c:e.t(t.list.address),d:e.t(o.list.detail_adrs),e:e.t(o.list.name),f:e.t(e.unref(c)),g:e.o(g=>p()),h:e.p({name:"edit",size:"42rpx"}),i:e.o(l),j:e.o(u),k:e.o(a),l:e.o(d),m:e.p({rightWidth:65,asyncClose:!0}),n:e.o(_),o:e.p({useSlot:!0,title:"确认删除",show:s.value,showCancelButton:!0})})}},f=e._export_sfc(v,[["__scopeId","data-v-6b4bf86f"],["__file","D:/github/app-unis/subpkg/Address/components/AddressItem.vue"]]);wx.createComponent(f);

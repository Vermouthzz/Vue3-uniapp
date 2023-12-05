"use strict";const e=require("../../common/vendor.js"),k=require("../../hooks/useMiddle.js"),x=require("../../api/address.js"),A=require("../../store/useAddressStore.js");require("../../request/index.js");require("../../store/useUserStore.js");if(!Array){const p=e.resolveComponent("van-icon"),u=e.resolveComponent("uni-icons"),s=e.resolveComponent("van-switch"),o=e.resolveComponent("van-cascader"),r=e.resolveComponent("van-popup");(p+u+s+o+r)()}const b={__name:"add-edit",setup(p){A.useAddressStore();const u=e.ref(0),s=e.ref("1"),o=e.ref({name:"",contact:"",adress:""}),r=e.ref(0),d=e.ref([]),n=e.ref(!1),i=e.ref([]),_=e.ref(!1),m=()=>{e.index.navigateBack()},f=(a="close")=>{a=="open"?n.value=!0:n.value=!1},v=e.ref(""),h=a=>{const{selectedOptions:l,value:t}=a.detail;l.forEach(c=>i.value.push(c.value)),v.value=l.map(c=>c.text||c.name).join(" "),r.value=t,a.type==="finish"&&(n.value=!1)},g=()=>{for(let a in o.value)if(o.value[a]==""||i.value.length==0){e.index.showToast({icon:"error",title:"请填写完整信息"});return}console.log(o.value),console.log(i.value),s.value=="1"?addAddressAPI():updateAddressAPI(o.value,i.value,_.value)},w=async()=>{const a=await x.getRegionAPI();d.value=a};return e.onLoad(a=>{s.value=a.type,k.useMiddle(".edit-add-title").then(l=>u.value=l.top),w()}),(a,l)=>e.e({a:e.o(m),b:e.p({name:"arrow-left",size:"36rpx"}),c:e.t(s.value=="1"?"新增地址":"编辑地址"),d:u.value+"px",e:o.value.name,f:e.o(t=>o.value.name=t.detail.value),g:e.p({type:"bottom",size:"12",color:"#696969"}),h:o.value.contact,i:e.o(t=>o.value.contact=t.detail.value),j:v.value},v.value?{k:e.t(v.value)}:{},{l:e.o(t=>f("open")),m:o.value.adress,n:e.o(t=>o.value.adress=t.detail.value),o:e.f(3,(t,c,y)=>({a:t})),p:e.p({checked:_.value,size:"24px"}),q:e.o(g),r:n.value},n.value?{s:e.o(f),t:e.o(h),v:e.p({swipeable:!0,value:r.value,title:"地址",options:d.value,activeColor:"#ee0a24"})}:{},{w:e.p({show:n.value,position:"bottom"})})}},q=e._export_sfc(b,[["__file","D:/github/app-unis/subpkg/add-edit/add-edit.vue"]]);wx.createPage(q);

"use strict";const e=require("../../common/vendor.js"),f=require("../../hooks/useMiddle.js"),_=require("../../store/useUserStore.js");Array||e.resolveComponent("van-icon")();Math||m();const m=()=>"./components/InfoItem.js",h={__name:"userinfo",setup(c){const{userInfo:t,clearUserInfo:i}=_.useUserStore(),r=()=>{e.index.navigateBack()},s=e.ref(0),u=()=>{i(),e.index.navigateBack()},p=()=>{e.index.chooseImage({count:1,sourceType:"album",success:o=>{const n=o.tempFiles[0].path;e.index.uploadFile({url:"http://localhost:3000/api/uni/upload",filePath:n,name:"file",formData:{id:t.u_id},success:a=>{if(a.statusCode===200){const l=JSON.parse(a.data);t.avator=l.avator,e.index.showToast({icon:"success",title:"更换成功"})}}})}})},d=()=>{e.index.request({url:"http://localhost:3000/api/uni/userinfo",data:t,method:"POST",success:o=>{o.statusCode===200&&e.index.showToast({icon:"success",title:"更新成功"})}})};return e.onLoad(()=>{f.useMiddle(".u-top").then(o=>s.value=o.top)}),(o,n)=>({a:e.o(r),b:e.p({name:"arrow-left",size:"40rpx"}),c:s.value+"px",d:e.unref(t).avator,e:e.o(p),f:e.o(d),g:e.o(u)})}},v=e._export_sfc(h,[["__file","D:/github/app-unis/subpkg/userinfo/userinfo.vue"]]);wx.createPage(v);

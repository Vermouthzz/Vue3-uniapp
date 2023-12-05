"use strict";const e=require("../../common/vendor.js"),_=require("../../hooks/useMiddle.js"),f=require("../../store/useUserStore.js"),g=require("../../store/useCartStore.js"),h=require("../../store/useUserCardStore.js");require("../../api/cart.js");require("../../request/index.js");require("../../api/user.js");if(!Array){const c=e.resolveComponent("van-icon"),a=e.resolveComponent("uni-forms-item"),r=e.resolveComponent("uni-forms");(c+a+r)()}const w={__name:"login",setup(c){const a=e.ref(0),r=e.ref(!1),s=e.ref(!1),i=f.useUserStore(),l=h.useUserCardStore(),d=g.useCartStore(),p=()=>{s.value=!s.value,o.value={}},o=e.ref({acconut:"",password:""}),v=()=>{r.value=!r.value},m=()=>{if(!r.value){e.index.showToast({icon:"success",title:"请同意协议"});return}s.value?e.index.request({url:"/register",method:"POST",header:{"content-type":"application/json"},data:{account:o.value.acconut,password:o.value.password},success:t=>{console.log(t),t.data.status==="200"&&e.index.showToast({icon:"success",title:"注册成功"})}}):e.index.request({url:"/login",method:"POST",header:{"content-type":"application/json"},data:{account:o.value.acconut,password:o.value.password},success:t=>{if(t.data.status==="200"){const{data:n}=t;i.setUserInfo(n.data),e.index.showToast({icon:"success",title:"登录成功"}),d.getCartList(),l.getUserCardInfo(n.data.user_id),setTimeout(()=>{e.index.switchTab({url:"/pages/profile/profile"})},500)}}})};return e.onLoad(()=>{_.useMiddle(".login-header").then(t=>a.value=t.top)}),(t,n)=>({a:e.p({name:"home-o",size:"36rpx"}),b:a.value+"px",c:e.t(s.value?"免费注册":"欢迎登录"),d:o.value.acconut,e:e.o(u=>o.value.acconut=u.detail.value),f:o.value.password,g:e.o(u=>o.value.password=u.detail.value),h:e.sr("form","50248efd-1"),i:e.p({modelValue:"formData"}),j:e.t(s.value?"去登陆":"免费注册"),k:e.o(p),l:e.o(v),m:e.t(s.value?"注册":"登录"),n:e.o(m)})}},x=e._export_sfc(w,[["__file","D:/github/app-unis/indexpkg/login/login.vue"]]);wx.createPage(x);

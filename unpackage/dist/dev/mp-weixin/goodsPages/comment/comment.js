"use strict";const e=require("../../common/vendor.js"),c=require("../../api/comment.js");require("../../request/index.js");require("../../store/useUserStore.js");Array||e.resolveComponent("CustomHeader")();const r=()=>"../../components/CustomHeader/CustomHeader.js";Math||(r+a)();const a=()=>"../../indexpkg/components/CommentBlock.js",i={__name:"comment",setup(t){const{safeAreaInsets:s}=e.index.getSystemInfoSync(),n=e.ref(""),m=async()=>{const o=await c.getCommentListAPI();n.value=o};return e.onLoad(o=>{m()}),(o,u)=>({a:e.p({title:"评价"}),b:e.unref(s).top+"px"})}},_=e._export_sfc(i,[["__file","D:/github/app-unis/goodsPages/comment/comment.vue"]]);wx.createPage(_);

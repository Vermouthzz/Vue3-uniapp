"use strict";const s=require("../../common/vendor.js"),a=require("../../api/goods.js");require("../../utils/mitt.js");require("../../request/index.js");require("../../store/useUserStore.js");Math||(r+c+i+u+G+_+m+p+g)();const r=()=>"./components/GoodsHeader.js",c=()=>"./components/GoodsDetail.js",u=()=>"./components/GoodsDeliver.js",i=()=>"./components/GoodsHotfee.js",g=()=>"./components/GoodsFooter.js",m=()=>"./components/GoodsAboutHot.js",p=()=>"./components/GoodsArgument.js",G=()=>"./components/GoodsComment.js",_=()=>"./components/GoodsBrand.js",l={__name:"goods",setup(f){const o=s.ref({}),d=async e=>{const t=await a.getGoodsInfoAPI(e);o.value=t.result};return s.onLoad(e=>{const{id:t}=e;d(t)}),(e,t)=>s.e({a:s.p({goods:o.value}),b:o.value.goods_id,c:s.p({id:o.value.goods_id}),d:s.p({brandInfo:o.value.brand_info}),e:s.p({aboutList:o.value.aboutGoods,hotList:o.value.hotGoods}),f:s.p({arguments:o.value.attrList}),g:o.value.goods_argImg},o.value.goods_argImg?{h:s.f(o.value.goods_argImg,(n,b,j)=>({a:n,b:n}))}:{},{i:"30px"})}},v=s._export_sfc(l,[["__file","D:/github/app-unis/indexpkg/goods/goods.vue"]]);wx.createPage(v);

"use strict";const e=require("../../common/vendor.js"),m=require("../../api/index.js");require("../../request/index.js");require("../../store/useUserStore.js");Math||(x+b+w+h)();const b=()=>"./components/Search.js",x=()=>"./components/CustomHeader.js",h=()=>"../../components/GoodsItem/GoodsItem.js",w=()=>"./components/IndexNav.js",y={__name:"index",setup(q){const o=[{id:1,img_url:"https://yanxuan-item.nosdn.127.net/e54a19cb355aa22cb8d6b914dd8aa6a9.jpg?type=webp&imageView&quality=65&thumbnail=330x330"},{id:2,img_url:"https://yanxuan-item.nosdn.127.net/10bccd52a8a49022cac8506c210be677.jpg?type=webp&imageView&quality=65&thumbnail=330x330"},{id:3,img_url:"https://yanxuan-item.nosdn.127.net/8dc0bd2d7e58ace9465aa0cc28998721.png?type=webp&imageView&quality=65&thumbnail=330x330"},{id:4,img_url:"https://yanxuan-item.nosdn.127.net/c56dd747c5fd8481ceae603f54286d41.jpg?type=webp&imageView&quality=65&thumbnail=330x330"}],l=e.ref(1),p=t=>{l.value=t.detail.current+1},g=(t,d)=>{e.index.previewImage({urls:o.map(a=>a.img_url),count:t.img_url,current:d})};e.ref("");const s=e.ref(!1),f=t=>{t.detail.scrollTop>30?s.value=!0:s.value=!1},n=e.ref([]),i=e.ref({page:1,pageSize:11}),_=async()=>{const t=await m.getHomeListAPI(i.value);n.value=t};let r=e.ref(!0);const v=async()=>{if(r.value){r.value=!1,i.value.page++;const t=await m.getHomeListAPI(i.value);if(t.length==0)return;n.value=[...n.value,...t],r.value=!0}};return e.onMounted(()=>{_()}),(t,d)=>({a:e.p({scroll:s.value}),b:e.f(o,(a,c,u)=>({a:a.img_url,b:e.o(j=>g(a,c),a.id),c:a.id})),c:e.o(p),d:e.t(l.value),e:e.t(o.length),f:e.f(4,(a,c,u)=>({a})),g:e.f(n.value,(a,c,u)=>({a:"5cbdd38b-3-"+u,b:e.p({goodsItem:a}),c:a.goods_id})),h:e.o(f),i:e.o(v)})}},I=e._export_sfc(y,[["__file","D:/github/app-unis/pages/index/index.vue"]]);wx.createPage(I);
"use strict";const o=require("../common/vendor.js"),u=require("../store/useUserStore.js");let i="http://localhost:3000/api/uni";const s={invoke(e){var t;e.url=i+e.url,e.timeout=1e4,e.header={...e.header,"source-client":"miniapp"};const r=(t=u.useUserStore().userInfo)==null?void 0:t.token;r&&(e.header.Authorization=r)}};o.index.addInterceptor("request",s);o.index.addInterceptor("uploadFile",s);const c=e=>new Promise((n,r)=>{o.index.request({...e,success:t=>{n(t.data)}})});exports.http=c;
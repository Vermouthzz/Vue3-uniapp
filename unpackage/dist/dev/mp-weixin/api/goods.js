"use strict";const o=require("../request/index.js"),d=t=>o.http({url:"/goods",method:"GET",data:{id:t}}),r=t=>o.http({url:"/brand/goods",data:{brand_id:t}}),s=t=>o.http({url:"/sku",data:{goods_id:t}});exports.getBrandGoodsAPI=r;exports.getGoodsInfoAPI=d;exports.getSkuListAPI=s;

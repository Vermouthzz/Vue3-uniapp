"use strict";const r=require("../request/index.js"),s=(e,t)=>r.http({url:"/search",method:"GET",data:{name:e,type:t}});exports.getSearchResultAPI=s;

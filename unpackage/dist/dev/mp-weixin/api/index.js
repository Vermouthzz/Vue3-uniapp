"use strict";const r=require("../request/index.js"),s=({page:t,pageSize:e})=>r.http({url:"/home",data:{page:t,pageSize:e}});exports.getHomeListAPI=s;

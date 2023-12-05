"use strict";const e=require("../request/index.js"),r=t=>e.http({url:"/subcate",data:{id:t.id,f_parentId:t.parent_id}});exports.getSubcateListAPI=r;

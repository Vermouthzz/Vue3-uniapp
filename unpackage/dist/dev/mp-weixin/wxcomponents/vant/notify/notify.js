"use strict";const l=require("../common/color.js"),c={selector:"#van-notify",type:"danger",message:"",background:"",duration:3e3,zIndex:110,top:0,color:l.WHITE,safeAreaInsetTop:!1,onClick:()=>{},onOpened:()=>{},onClose:()=>{}};let o=Object.assign({},c);function s(t){return t==null?{}:typeof t=="string"?{message:t}:t}function r(){const t=getCurrentPages();return t[t.length-1]}function n(t){t=Object.assign(Object.assign({},o),s(t));const e=(t.context||r()).selectComponent(t.selector);if(delete t.context,delete t.selector,e)return e.setData(t),e.show(),e;console.warn("未找到 van-notify 节点，请确认 selector 及 context 是否正确")}n.clear=function(t){t=Object.assign(Object.assign({},c),s(t));const e=(t.context||r()).selectComponent(t.selector);e&&e.hide()};n.setDefaultOptions=t=>{Object.assign(o,t)};n.resetDefaultOptions=()=>{o=Object.assign({},c)};exports.Notify=n;

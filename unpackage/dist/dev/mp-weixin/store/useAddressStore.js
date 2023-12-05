"use strict";const d=require("../common/vendor.js"),r=require("../api/address.js"),u=d.defineStore("address",()=>{const s=d.ref(""),i=d.computed(()=>s.value.find(e=>e.is_selected==1)),A=d.computed(()=>s.value.find(e=>e.selected)),t=async()=>{const e=await r.getAddressAPI();s.value=e};return{addressList:s,getAddresList:t,delAddress:async e=>{await r.delAddressAPI(e),t()},updateAddress:async e=>{await r.updateAddressItemAPI(e),t()},selectedAddress:i,onSelectedAddress:async(e,a)=>{d.index.showLoading({mask:!0});const c=await r.updateAddressListAPI(e,a);t(),c&&d.index.hideLoading()},tapAddress:(e,a=!1,c="tap")=>{s.value.forEach(n=>n.selected=!1);const o=s.value.find(n=>n.addres_id==e);c=="tap"?o.selected=!0:o.selected=a},storeAddress:A}});exports.useAddressStore=u;

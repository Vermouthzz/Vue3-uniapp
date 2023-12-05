"use strict";function c(e){const s=[],u=2**e.length;for(let n=0;n<u;n+=1){const o=[];for(let t=0;t<e.length;t+=1)n&1<<t&&o.push(e[t]);s.push(o)}return s}exports.Set=c;

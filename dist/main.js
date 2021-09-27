(()=>{"use strict";var r,n,e,t,o,a,i,c,s,d,p,u,l,f,v={426:(r,n,e)=>{e.d(n,{Z:()=>c});var t=e(81),o=e.n(t),a=e(645),i=e.n(a)()(o());i.push([r.id,"* {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody{\r\n    font-family: Graphik Web,Helvetica Neue,Helvetica,Arial,sans-serif;\r\n}\r\n\r\n.page-header {\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-evenly;\r\n    align-items: center;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    color: #212529;\r\n    width: 100%;\r\n    background-color: rgba(156, 154, 154, 0.247);\r\n}\r\n\r\n#page-heading{\r\n    margin-bottom: auto;\r\n    margin-top: auto;\r\n}\r\n\r\n.add-project-container{\r\n    cursor: pointer;\r\n    padding-left: 5px;\r\n    padding-right: 5px;\r\n}\r\n\r\n.add-project-container:hover {\r\n    background-color: rgb(240 237 237 / 22%);\r\n\r\n}\r\n\r\n#addition-symbol{\r\n    font-weight: 500;\r\n    font-size: 2.2em;\r\n}\r\n\r\n#add-project-button{\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n}\r\n\r\n#add-project-text{\r\n    font-size: 19px;\r\n    padding-left: 10px;\r\n}\r\n\r\n#search-bar{\r\n    border-radius: 8px;\r\n    border: none;\r\n    font-size: medium;\r\n    padding: 5px 149px 5px 7px;\r\n    outline: none;\r\n}\r\n\r\n.sidebar{\r\n    background-color: #212529;\r\n    height: 100%;\r\n    width: 160px;\r\n    color: white;\r\n    position: fixed;\r\n    z-index: 1;\r\n}  \r\n\r\n.display-categories{\r\n    padding-top: 10px;\r\n}\r\n\r\n.category-item{\r\n    padding: 6px 8px 18px 16px;\r\n    cursor: pointer;\r\n}\r\n\r\n.category-item:hover{\r\n    background-color: darkgrey;\r\n}\r\n\r\n\r\n",""]);const c=i},645:r=>{r.exports=function(r){var n=[];return n.toString=function(){return this.map((function(n){var e="",t=void 0!==n[5];return n[4]&&(e+="@supports (".concat(n[4],") {")),n[2]&&(e+="@media ".concat(n[2]," {")),t&&(e+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),e+=r(n),t&&(e+="}"),n[2]&&(e+="}"),n[4]&&(e+="}"),e})).join("")},n.i=function(r,e,t,o,a){"string"==typeof r&&(r=[[null,r,void 0]]);var i={};if(t)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var d=0;d<r.length;d++){var p=[].concat(r[d]);t&&i[p[0]]||(void 0!==a&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=a),e&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=e):p[2]=e),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),n.push(p))}},n}},81:r=>{r.exports=function(r){return r[1]}},379:r=>{var n=[];function e(r){for(var e=-1,t=0;t<n.length;t++)if(n[t].identifier===r){e=t;break}return e}function t(r,t){for(var a={},i=[],c=0;c<r.length;c++){var s=r[c],d=t.base?s[0]+t.base:s[0],p=a[d]||0,u="".concat(d," ").concat(p);a[d]=p+1;var l=e(u),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==l)n[l].references++,n[l].updater(f);else{var v=o(f,t);t.byIndex=c,n.splice(c,0,{identifier:u,updater:v,references:1})}i.push(u)}return i}function o(r,n){var e=n.domAPI(n);return e.update(r),function(n){if(n){if(n.css===r.css&&n.media===r.media&&n.sourceMap===r.sourceMap&&n.supports===r.supports&&n.layer===r.layer)return;e.update(r=n)}else e.remove()}}r.exports=function(r,o){var a=t(r=r||[],o=o||{});return function(r){r=r||[];for(var i=0;i<a.length;i++){var c=e(a[i]);n[c].references--}for(var s=t(r,o),d=0;d<a.length;d++){var p=e(a[d]);0===n[p].references&&(n[p].updater(),n.splice(p,1))}a=s}}},569:r=>{var n={};r.exports=function(r,e){var t=function(r){if(void 0===n[r]){var e=document.querySelector(r);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(r){e=null}n[r]=e}return n[r]}(r);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(e)}},216:r=>{r.exports=function(r){var n=document.createElement("style");return r.setAttributes(n,r.attributes),r.insert(n,r.options),n}},565:(r,n,e)=>{r.exports=function(r){var n=e.nc;n&&r.setAttribute("nonce",n)}},795:r=>{r.exports=function(r){var n=r.insertStyleElement(r);return{update:function(e){!function(r,n,e){var t="";e.supports&&(t+="@supports (".concat(e.supports,") {")),e.media&&(t+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(t+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),t+=e.css,o&&(t+="}"),e.media&&(t+="}"),e.supports&&(t+="}");var a=e.sourceMap;a&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(t,r,n.options)}(n,r,e)},remove:function(){!function(r){if(null===r.parentNode)return!1;r.parentNode.removeChild(r)}(n)}}}},589:r=>{r.exports=function(r,n){if(n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}}},g={};function m(r){var n=g[r];if(void 0!==n)return n.exports;var e=g[r]={id:r,exports:{}};return v[r](e,e.exports,m),e.exports}m.n=r=>{var n=r&&r.__esModule?()=>r.default:()=>r;return m.d(n,{a:n}),n},m.d=(r,n)=>{for(var e in n)m.o(n,e)&&!m.o(r,e)&&Object.defineProperty(r,e,{enumerable:!0,get:n[e]})},m.o=(r,n)=>Object.prototype.hasOwnProperty.call(r,n),r=m(379),n=m.n(r),e=m(795),t=m.n(e),o=m(569),a=m.n(o),i=m(565),c=m.n(i),s=m(216),d=m.n(s),p=m(589),u=m.n(p),l=m(426),(f={}).styleTagTransform=u(),f.setAttributes=c(),f.insert=a().bind(null,"head"),f.domAPI=t(),f.insertStyleElement=d(),n()(l.Z,f),l.Z&&l.Z.locals&&l.Z.locals})();
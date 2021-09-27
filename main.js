(()=>{"use strict";var r,n,e,t,o,i,a,s,c,d,p,l,u,f,m={426:(r,n,e)=>{e.d(n,{Z:()=>s});var t=e(81),o=e.n(t),i=e(645),a=e.n(i)()(o());a.push([r.id,"* {\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody{\r\n    font-family: Graphik Web,Helvetica Neue,Helvetica,Arial,sans-serif;\r\n}\r\n\r\n.page-header {\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-evenly;\r\n    align-items: center;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    color: #212529;\r\n    width: 100%;\r\n    background-color: #00008c40;\r\n}\r\n\r\n#page-heading{\r\n    margin-bottom: auto;\r\n    margin-top: auto;\r\n}\r\n\r\n.add-project-container{\r\n    cursor: pointer;\r\n    padding-left: 5px;\r\n    padding-right: 5px;\r\n}\r\n\r\n.add-project-container:hover {\r\n    background-color: #00008c40;\r\n\r\n}\r\n\r\n#addition-symbol{\r\n    font-weight: 500;\r\n    font-size: 2.2em;\r\n}\r\n\r\n.add-project-button{\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n}\r\n\r\n#add-project-text{\r\n    font-size: 19px;\r\n    padding-left: 10px;\r\n}\r\n\r\n#search-bar{\r\n    border-radius: 8px;\r\n    border: none;\r\n    font-size: medium;\r\n    padding: 5px 149px 5px 7px;\r\n    outline: none;\r\n}\r\n\r\n.sidebar{\r\n    background-color: #212529;\r\n    height: 100%;\r\n    width: 250px;\r\n    color: white;\r\n    position: fixed;\r\n    z-index: 1;\r\n}  \r\n\r\n.display-categories{\r\n    padding-top: 10px;\r\n    list-style-type: none;\r\n}\r\n\r\n.category-item{\r\n    cursor: pointer;\r\n    margin: 4px 0 10px 0;\r\n    padding: 8px 0 8px 12px;\r\n}\r\n\r\n.category-item:hover{\r\n    background-color: darkgrey;\r\n}\r\n\r\n.projects{\r\n    padding-left: 12px;\r\n    margin-top: 14px;    \r\n}\r\n\r\n#projects-subheading{\r\n    font-size: larger;\r\n}\r\n\r\n.add-project-screen{\r\n    display: none;\r\n    position: fixed;\r\n    z-index: 2;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n#add-project-form{\r\n    color: black;\r\n    position: relative;\r\n    margin: 0 auto;\r\n    width: 500px;\r\n    top: 10.8rem;\r\n    border-style: ridge;\r\n    box-shadow: 10px 10px 10px rgba(156, 154, 154, 0.247);\r\n    animation-name: animatetop;\r\n    animation-duration: 0.6s;\r\n    animation-timing-function: ease-in-out;\r\n}\r\n\r\n#project-form-name{\r\n    width: 100.4%;\r\n    height: 32px;  \r\n    font-size: 18px;\r\n    border-style: ridge;\r\n    outline: none;  \r\n    border-top: none;\r\n    border-left: none;\r\n    border-right: none;\r\n    border-color: #00000030;\r\n}\r\n\r\n#form-buttons{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-evenly;\r\n    margin-top: 20px;\r\n    margin-bottom: 8px;\r\n}\r\n\r\n.form-button{\r\n    padding: 6px 20px 8px 20px;\r\n    background-color: #96a2ad;\r\n    color: white;\r\n    border: none;\r\n    text-align: center;\r\n    font-size: 18px;\r\n    cursor: pointer;\r\n    border-radius: 6px;\r\n}\r\n\r\n#add-project-button{\r\n    padding-right: 32px\r\n}\r\n\r\n@-webkit-keyframes animatetop {\r\n    from {top:-300px; opacity:0} \r\n    to {top:180px; opacity:1}\r\n  }\r\n  \r\n@keyframes animatetop {\r\n    from {top:-300px; opacity:0}\r\n    to {top:180px; opacity:1}\r\n}\r\n\r\n\r\n\r\n#todos-heading{\r\n    color: #212529;\r\n    font-size: 1.9rem;\r\n}\r\n\r\n.project-name{\r\n    margin-top: 25px;\r\n}\r\n\r\n.projects-list{\r\n    list-style-type: none;\r\n}\r\n\r\n.project-heading-container{\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: flex-end;\r\n}\r\n\r\n.project-heading{\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: baseline;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.add-task-symbol{\r\n    font-size: 1.4rem;\r\n    font-weight: 700;\r\n    margin-left: 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n.add-task-symbol:hover{\r\n    background-color: rgba(156, 154, 154, 0.247);\r\n}\r\n\r\n.todo-list-items{\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n  \r\n.fas{\r\n    font-size: 24px;\r\n}\r\n\r\n.summary-container{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    margin-top: 10px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.todos-container{\r\n    margin-left: 426px;\r\n    margin-top: 40px;\r\n    width: 50%;\r\n}\r\n\r\n.todo-deatails{\r\n    position: relative;\r\n    bottom: 10px;\r\n}\r\n\r\n.todo-notes{\r\n    font-size: 14px;\r\n    margin-left: 16px;\r\n    color: #4d5156;\r\n}\r\n\r\n.details-container{\r\n    display: block;\r\n}\r\n\r\n.down-arrow{\r\n    color: black;\r\n    font-size: 20px;\r\n}\r\n\r\n.project-name{\r\n    padding-left: 10px;\r\n}\r\n\r\n.project{\r\n    list-style-type: none;\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: baseline;\r\n    margin-top: 10px;\r\n}\r\n\r\n.sidebar-project-name::before{\r\n    list-style-type: none;\r\n    width: 1.25em;\r\n    line-height: 0;\r\n    content: '\\276F';\r\n    color: white;\r\n    display: inline-block;\r\n    transition: transform .35s ease;\r\n    transform-origin: .5em 50%;\r\n}\r\n\r\n.sidebar-project-name{\r\n    cursor: pointer;\r\n}\r\n\r\n.sidebar-task-title{\r\n    color: white;\r\n    list-style-type: none;\r\n    font-size: 14px;\r\n    padding-left: 22px;\r\n    margin-top: 4px;\r\n}\r\n\r\n.sidebar-project-name:hover::before{\r\n    transform: rotate(90deg);\r\n}\r\n\r\n.sidebar-tasks-collapse.hidden{\r\n    display: none;\r\n}\r\n\r\n.sidebar-tasks-collapse.shown{\r\n    display: block;\r\n    transition: max-height 0.2s ease-out;\r\n    overflow: hidden;\r\n    color: white;\r\n}",""]);const s=a},645:r=>{r.exports=function(r){var n=[];return n.toString=function(){return this.map((function(n){var e="",t=void 0!==n[5];return n[4]&&(e+="@supports (".concat(n[4],") {")),n[2]&&(e+="@media ".concat(n[2]," {")),t&&(e+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),e+=r(n),t&&(e+="}"),n[2]&&(e+="}"),n[4]&&(e+="}"),e})).join("")},n.i=function(r,e,t,o,i){"string"==typeof r&&(r=[[null,r,void 0]]);var a={};if(t)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var d=0;d<r.length;d++){var p=[].concat(r[d]);t&&a[p[0]]||(void 0!==i&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=i),e&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=e):p[2]=e),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),n.push(p))}},n}},81:r=>{r.exports=function(r){return r[1]}},379:r=>{var n=[];function e(r){for(var e=-1,t=0;t<n.length;t++)if(n[t].identifier===r){e=t;break}return e}function t(r,t){for(var i={},a=[],s=0;s<r.length;s++){var c=r[s],d=t.base?c[0]+t.base:c[0],p=i[d]||0,l="".concat(d," ").concat(p);i[d]=p+1;var u=e(l),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)n[u].references++,n[u].updater(f);else{var m=o(f,t);t.byIndex=s,n.splice(s,0,{identifier:l,updater:m,references:1})}a.push(l)}return a}function o(r,n){var e=n.domAPI(n);return e.update(r),function(n){if(n){if(n.css===r.css&&n.media===r.media&&n.sourceMap===r.sourceMap&&n.supports===r.supports&&n.layer===r.layer)return;e.update(r=n)}else e.remove()}}r.exports=function(r,o){var i=t(r=r||[],o=o||{});return function(r){r=r||[];for(var a=0;a<i.length;a++){var s=e(i[a]);n[s].references--}for(var c=t(r,o),d=0;d<i.length;d++){var p=e(i[d]);0===n[p].references&&(n[p].updater(),n.splice(p,1))}i=c}}},569:r=>{var n={};r.exports=function(r,e){var t=function(r){if(void 0===n[r]){var e=document.querySelector(r);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(r){e=null}n[r]=e}return n[r]}(r);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(e)}},216:r=>{r.exports=function(r){var n=document.createElement("style");return r.setAttributes(n,r.attributes),r.insert(n,r.options),n}},565:(r,n,e)=>{r.exports=function(r){var n=e.nc;n&&r.setAttribute("nonce",n)}},795:r=>{r.exports=function(r){var n=r.insertStyleElement(r);return{update:function(e){!function(r,n,e){var t="";e.supports&&(t+="@supports (".concat(e.supports,") {")),e.media&&(t+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(t+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),t+=e.css,o&&(t+="}"),e.media&&(t+="}"),e.supports&&(t+="}");var i=e.sourceMap;i&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleTagTransform(t,r,n.options)}(n,r,e)},remove:function(){!function(r){if(null===r.parentNode)return!1;r.parentNode.removeChild(r)}(n)}}}},589:r=>{r.exports=function(r,n){if(n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}}},x={};function g(r){var n=x[r];if(void 0!==n)return n.exports;var e=x[r]={id:r,exports:{}};return m[r](e,e.exports,g),e.exports}g.n=r=>{var n=r&&r.__esModule?()=>r.default:()=>r;return g.d(n,{a:n}),n},g.d=(r,n)=>{for(var e in n)g.o(n,e)&&!g.o(r,e)&&Object.defineProperty(r,e,{enumerable:!0,get:n[e]})},g.o=(r,n)=>Object.prototype.hasOwnProperty.call(r,n),r=g(379),n=g.n(r),e=g(795),t=g.n(e),o=g(569),i=g.n(o),a=g(565),s=g.n(a),c=g(216),d=g.n(c),p=g(589),l=g.n(p),u=g(426),(f={}).styleTagTransform=l(),f.setAttributes=s(),f.insert=i().bind(null,"head"),f.domAPI=t(),f.insertStyleElement=d(),n()(u.Z,f),u.Z&&u.Z.locals&&u.Z.locals,(()=>{const r=document.querySelector(".add-project-container"),n=document.querySelector(".add-project-screen");r.addEventListener("click",(()=>{n.style.display="block"}))})(),(()=>{const r=document.querySelector(".sidebar-project-name"),n=document.querySelector(".sidebar-tasks-collapse");r.addEventListener("click",(()=>{Array.from(n.classList).includes("hidden")?(n.classList.remove("hidden"),n.classList.add("shown")):(n.classList.remove("shown"),n.classList.add("hidden"))}))})()})();
!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([,function(e,n){const t=decodeURIComponent(window.location.search),{countryName:o,alpha2Code:r}=JSON.parse(t.split("=")[1]);fetch("https://restcountries.eu/rest/v2/name/"+o).then(e=>e.json()).then(e=>{const n=e.filter(e=>e.alpha2Code===r)[0];console.log(n),function(e){const n=document.querySelector("#flag"),t=document.querySelector("#name"),o=document.querySelector("#native-name"),r=document.querySelector("#population"),c=document.querySelector("#region"),u=document.querySelector("#sub-region"),a=document.querySelector("#capital"),l=document.querySelector("#top-level-domain"),i=document.querySelector("#currencies"),s=document.querySelector("#languages"),d=document.querySelector("#border-countries");n.src=e.flag,t.innerHTML=e.name,o.innerHTML="Native Name: "+e.nativeName,r.innerHTML="Population: "+e.population,c.innerHTML="Region: "+e.region,u.innerHTML="Sub Region: "+e.subregion,a.innerHTML="Capital: "+e.capital,l.innerHTML="Top Level Domain: "+e.topLevelDomain.join(" ");let p=[];e.currencies.forEach(e=>{p.push(e.name)}),i.innerHTML="Currencies: "+p.join(", "),lang=[],e.languages.forEach(e=>{lang.push(e.name)}),s.innerHTML="Langugages: "+lang.join(", ");const m=e.borders;if(0===m.length){const e=document.createElement("p");e.className="col-auto",e.innerHTML="None",d.appendChild(e)}m.forEach(e=>{fetch("https://restcountries.eu/rest/v2/alpha/"+e).then(e=>e.json()).then(e=>{const{name:n,alpha2Code:t}=e,o=document.createElement("p");o.className="col-auto",o.innerHTML=n,o.id="border-country",d.appendChild(o)}).catch(e=>console.log(e))})}(n)}).catch(e=>console.log(e))}]);
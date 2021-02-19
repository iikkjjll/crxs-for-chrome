'use strict';Registry.require("promise helper i18n xmlhttprequest uri permission convert".split(" "),()=>{const l={DEFAULT:"default",OFF:"off",NATIVE:"native",CHROME:"chrome",NOT_ENABLED:"not_enabled",NOT_WHITELISTED:"not_whitelisted",NOT_PERMITTED:"not_permitted",NOT_SUPPORTED:"not_supported",NOT_SUCCEEDED:"not_succeeded"},k=Registry.log,w=rea.FEATURES,p=Registry.get("promise"),x=Registry.get("helper"),r=Registry.get("permission"),A=Registry.get("i18n"),B=Registry.get("xmlhttprequest"),L=Registry.get("uri"),
C=Registry.get("convert"),M=B.run;let t=l.OFF,D=[],v=null,E=!1;const q={};let F=!1,G=()=>{const a=p();Registry.vendor(["vendor/saveas/filesaver"],()=>{G=p.Pledge;a.resolve()});return a.promise()};const z=()=>null!==v?p.Pledge(v):!rea.permissions.supported&&rea.downloads.supported?(v=!0,p.Pledge(v)):r.has(r.permDownloads).then(a=>{v=a;k.log("downs: permission to use rea.downloads ->",a);return z()}),N=function(a,c){if(this[a])this[a]("function"==typeof c?c():c)},h=function(a,c){this[a]&&(N.apply(this,
arguments),this[a]=null)};let O=0;var J=(a,c,b)=>{var d=p();v&&!F&&rea.downloads.supported&&(rea.downloads.onChanged.addListener(H),F=!0);const g={filename:a.name};let e;if(w.RUNTIME.FIREFOX&&52>w.RUNTIME.BROWSER_VERSION)e=["url"];else{e=["url","method","saveAs"];g.body=a.data;const f=a.headers;f&&(Array.isArray(f)?k.warn("downs: invalid type of headers property",f):g.headers=Object.keys(f).map(m=>({name:m,value:f[m]})))}e.forEach(f=>{g[f]=a[f]});const n=q[c.download_id]={callbacks:{onprogress:b.onprogress,
onload:f=>{d.resolve();h.apply(b,["onload",f])},onerror:f=>{d.reject(f);h.apply(b,["onerror",f])}},url:a.url,name:a.name};rea.downloads.download(g,(f,m)=>{if(void 0===f)d.reject(m),h.apply(b,["onerror",{error:m}]);else{n.id=f;m=y=>{rea.downloads.cancel(f,()=>{u();y&&y()})};var u=()=>{rea.downloads.search({id:f},y=>{let I;(I=y[0])?H(I):k.warn("downs: unable to query download ID",f)})};!0===n.cancel?m():(n.cancel=m,n.interval=window.setInterval(u,1E3))}});rea.runtime.lastError&&(c=rea.runtime.lastError.message,
d.reject(c),h.apply(b,["onerror",{error:c}]));return d.promise()},P=(a,c,b)=>{var d=p();void 0===b&&(b={});a.responseType="blob";a.method=a.method||"GET";const g=M(a,{onload:e=>{if(4!=e.readyState||200!=e.status&&0!=e.status||e.error)e=e.error||e.statusText||"xhr_failed",d.reject(e),h.apply(b,["onerror",{error:e}]);else{const n=B.parseHeaders(e.responseHeaders)["content-type"];e=new Blob([e.response],{type:a.overrideMimeType||n||"binary/octet-stream"});d.resolve(e);h.apply(b,["onload",{}])}},onerror:e=>
{d.reject();h.apply(b,["onerror",e])},onabort:()=>{d.reject();h.apply(b,["onerror",{error:"aborted"}])},ontimeout:e=>{d.reject();h.apply(b,["ontimeout",e])},onprogress:b.onprogress},{internal:c.internal});q[c.download_id]={cancel:g?g.abort:()=>{}};return d.promise()},Q=a=>{let c,b;Object.keys(q).every(d=>{let g;return(g=q[d])&&g.id==a?(b=d,c=g,!1):!0});return{item:c,key:b}},H=a=>{const {item:c,key:b}=Q(a.id);if(c){const d=c.callbacks,g=()=>{c.interval&&(window.clearInterval(c.interval),c.interval=
null);delete q[b]};a.error||[a.state,a.state&&a.state.current].includes("interrupted")?(k.warn("downs: download of",c.name,"("+c.url+")","failed",a.error),h.apply(d,["onerror",{error:l.NOT_SUCCEEDED,details:a.error}]),g()):a.endTime||[a.state,a.state&&a.state.current].includes("complete")?(k.log("downs: download of",c.name,"("+c.url+")","finished"),h.apply(d,["onload",{}]),g()):void 0===a.totalBytes&&void 0===a.bytesReceived||h.apply(d,["onprogress",{loaded:a.bytesReceived,total:a.totalBytes,estimatedEndTime:a.estimatedEndTime}])}},
K=a=>{let c=!1;x.each(D,(b,d)=>{if(b&&b.length)try{let g;if("/"===b[0])b=b.replace(/^\//g,"").replace(/\/$/g,""),"$"!==b[b.length-1]&&(k.log("downs: patching $ into",b),b+="$"),g=new RegExp(b,"i");else if("."===b[0]){const e=[x.escapeForRegExp(b),"$"].join("");g=new RegExp(e,"i")}else k.warn("downs: invalid file extension:",'"'+b+'"','starts neither with "." nor with "/"');if(g&&-1!==a.search(g))return k.log("downs:",b,"matched @",a),c=!0}catch(g){k.warn("downs: can't process",b,g)}});return c};Registry.register("downloads",
"e1582c36",{start:function(a,c,b){b=b||{};const d=++O;q[d]={};k.log("downs: start",a);if(!b.internal){if(t==l.OFF){k.warn("downs: feature is not enabled");h.apply(c,["onerror",{error:l.NOT_ENABLED}]);return}if(!a.name||!K(a.name)){k.warn("downs:",a.name,"is not whitelisted");h.apply(c,["onerror",{error:l.NOT_WHITELISTED}]);return}if(!rea.downloads.supported&&t==l.CHROME){k.warn("downs: this download mode is not supported");h.apply(c,["onerror",{error:l.NOT_SUPPORTED}]);return}}const g=()=>
{if(q[d].cancel)return h.apply(c,["onerror",{error:"aborted"}]),p.Breach("aborted")},e=a.name;e&&(a.name=x.safeFileName(e,!0),e!=a.name&&k.warn(`downs: changed file name from ${e} to ${a.name} for safety`));let n;p.Pledge().then(()=>{if(rea.downloads.supported&&(b.internal||t==l.CHROME||t==l.DEFAULT))return z().then(f=>n=f).then(g);n=!1}).then(()=>{if("data:"==L.parse(a.url).protocol)return C.dataUri2Blob(a.url);if(!n||!b.internal&&(w.RUNTIME.FIREFOX||w.RUNTIME.SAFARI)&&t==l.DEFAULT)return P(a,{internal:b.internal,
download_id:d},{onerror:c.onerror,ontimeout:c.ontimeout,onprogress:c.onprogress})}).then(f=>{if(f&&n){let m;return p.Pledge().then(()=>{if(w.RUNTIME.SHARED_OBJECT_URLS)return m=URL.createObjectURL(f);var u=p();C.blob2dataUri(f,u.resolve);return u.promise()}).then(u=>J({url:u,name:a.name,saveAs:a.saveAs},{download_id:d},{onerror:c.onerror,onload:c.onload}).always(()=>{m&&URL.revokeObjectURL(m)}))}if(f)return a.name=a.name||"File.download",G().then(()=>{saveAs(f,a.name);h.apply(c,["onload",{}])});if(n)return J(a,
{download_id:d},c);b.internal||t!=l.CHROME?(k.warn("downs: download failed"),h.apply(c,["onerror",{error:"failed"}])):(k.warn("downs: download permission is missing"),h.apply(c,["onerror",{error:l.NOT_PERMITTED}]))}).always(()=>{delete q[d];window.setTimeout(()=>h.apply(c,["ondone",{}]),1)});return d},cancel:a=>{if(a=q[a])return a.cancel?"function"===typeof a.cancel&&a.cancel():a.cancel=!0,!0},set_mode:a=>{t=a;t==l.CHROME&&z().done(c=>{c||r.has(r.permDownloads).then(b=>{const d=p();E||b?d.resolve({permission:b,
asked:!1}):r.ask(r.permDownloads,A.getMessage("Browser_API_Downloads"),A.getMessage("Click_here_to_allow_TM_to_start_downloads")).done(g=>{d.resolve({permission:g,asked:!0})});E=!0;return d.promise()}).done(b=>{b.permission&&b.asked&&rea.page.reload()})})},set_whitelist:a=>{"Array"===x.toType(a)&&(D=a)},is_whitelisted:K,remove_permission:()=>r.remove(r.permDownloads),staticVars:l})});

var imgFromXhr=[];!function(){var n;window.addEventListener("message",function(n){"img-from-xhr"==n.data.topic&&(imgFromXhr=imgFromXhr.concat(n.data.data))});var e=setInterval(()=>{if(n=document.querySelector("noscript")){n=n.innerText.match('nonce="(.*?)"')[1];var t=document.createElement("script");t.setAttribute("nonce",n),t.innerText="\n    var open = window.XMLHttpRequest.prototype.open,\n    send = window.XMLHttpRequest.prototype.send,\n    onReadyStateChange;\n\nfunction openReplacement(method, url, async, user, password) {\n    var syncMode = async !== false ? 'async' : 'sync';\n    return open.apply(this, arguments);\n}\n\nfunction sendReplacement(data) {\n\n    if(this.onreadystatechange) {\n        this._onreadystatechange = this.onreadystatechange;\n    }\n    this.onreadystatechange = onReadyStateChangeReplacement;\n\n    return send.apply(this, arguments);\n}\n\nfunction onReadyStateChangeReplacement() {\n    if(this.readyState == 4){\n        var dd = this.responseText.match('\\\\[\\\\[\"wrb.*');\n        window.postMessage({\n            topic: 'img-from-xhr',\n            data: JSON.parse(dd+']')[0][2]\n        });\n    }\n    if(this._onreadystatechange) {\n        return this._onreadystatechange.apply(this, arguments);\n    }\n}\n\nwindow.XMLHttpRequest.prototype.open = openReplacement;\nwindow.XMLHttpRequest.prototype.send = sendReplacement;\n    ",document.body.appendChild(t),clearInterval(e)}},1e3)}(),window.aiparser=function(n){var e=0;function t(t){e++,new ParsedPItem(t,e++,n,function(e){chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:n.id,item:e})})}document.querySelectorAll(".rg_meta").forEach(function(n){try{var e=JSON.parse(n.innerText);t({src:e.ou,smallUrl:e.tu,width:e.ow,height:e.oh})}catch(n){}}),document.querySelectorAll("script").forEach(function(n){try{var e=n.innerText.match("AF_initDataCallback\\({key: 'ds:2'"),a=[].concat(imgFromXhr);e&&a.unshift(n.innerText.match("\\[[\\s\\S]*\\]")[0]),a.forEach(function(n){(n=(n=JSON.parse(n))[0][4][0][12][2]).forEach(function(n){try{var e=n[1][3];t({src:e[0],smallUrl:e[0],width:e[2],height:e[1]})}catch(n){}})})}catch(n){}})};
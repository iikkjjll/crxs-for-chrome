function aiparser(e){var r=0;document.querySelectorAll("img").forEach(function(a){var c,i=a.dataset.originSrc||a.src.replace(/\/(small|medium)\./,"/large.");i=i.replace(/^\/\//,location.protocol+"//"),new ParsedPItem({src:i,alt:c},r++,e,function(r){chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:e.id,item:r})})})}window.aiparser=aiparser;
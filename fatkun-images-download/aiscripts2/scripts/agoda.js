function aiparser(e){var r=0;var a=document.querySelectorAll(".thumbnail-image");0==a.length&&(a=document.querySelectorAll("img")),a.forEach(function(a){var t,n;t=a.src.replace(/\?s=\d+x\d+/,"?")+"#"+$(a).closest(".thumbnail-wrapper").attr("data-element-index"),new ParsedPItem({src:t,alt:n},r++,e,function(r){chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:e.id,item:r})})})}window.aiparser=aiparser;
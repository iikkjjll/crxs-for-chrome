function aiparser(e){var o=0;function t(t,r){new ParsedPItem({src:t,alt:r},o++,e,function(o){chrome.runtime.sendMessage({cmd:"ADD_IMG",tabId:e.id,item:o})})}var r=document.createElement("script");(r.innerText="localStorage.__hotelPhotos = JSON.stringify(window.booking.env.hotelPhotos);",document.body.appendChild(r),localStorage.__hotelPhotos)?JSON.parse(localStorage.__hotelPhotos).forEach(function(e){t(e.highres_url||e.large_url)}):(imgs=document.querySelectorAll("img"),imgs.forEach(function(e){t(e.src)}))}window.aiparser=aiparser;
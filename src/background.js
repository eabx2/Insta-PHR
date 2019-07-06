// Starting Notification
console.log("Instagram-PHR \nReady to go");

/**********************************************/

function getPage(url){
    
    return new Promise(function(resolve, reject){
                
        var xhrProfile = new XMLHttpRequest();
        xhrProfile.open("GET", url, true);
        xhrProfile.onreadystatechange = function() {
            if (xhrProfile.readyState == 4) {
                var page = xhrProfile.responseText;
                resolve(page);
            }
        }
        xhrProfile.send();
        
    });
    
}

// define onClick function
openHighResolution = function(info){
    
    // case: in instagram profile - not in display mode - if it is a story then take first image
    if(info.linkUrl){
        getPage(info.linkUrl)
            .then(value => {
                    var pattern = new RegExp('property="og:image" content="(.+)"');
                    var res = pattern.exec(value);
                    var photoLink = res[1];
                    window.open(photoLink);
                });    
    }
    
    /* covers TWO cases:
     * case: in instagram profile - in display mode
     * case: in image page
     */
    else {
        // run script which is allowed to access DOM
        chrome.tabs.executeScript(null, {file:'src/script.js'})
    }
    
}

/**********************************************/

// add context menu in case: in instagram profile, an instagram image is clicked
chrome.contextMenus.create({
    title: "Open in High Resolution",
    documentUrlPatterns: ["*://www.instagram.com/*"], // show in only instagram profile
    targetUrlPatterns:["*://www.instagram.com/p/*/"], // show only if target is an instagram image link
    contexts: ["link"], // allow to be appeared in only page
    onclick: openHighResolution
});

// add context menu in case: in instagram photo
chrome.contextMenus.create({
    title: "Open in High Resolution",
    documentUrlPatterns: ["*://www.instagram.com/p/*/"], // show in only instagram profile
    contexts: ["page"], // allow to be appeared in only page
    onclick: openHighResolution
});
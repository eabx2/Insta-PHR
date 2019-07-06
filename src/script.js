main();

function main(){
    
    try {
        
        var divs1 = document.getElementsByClassName("MreMs");
        var translateXPositive = new RegExp("([0-9]+)").exec(divs1[divs1.length-1].style.transform)[1];

        var divs2 = document.getElementsByClassName("bsGjF");
        var imageWidth = new RegExp("([0-9]+)").exec(divs2[divs2.length-1].style.width)[1];
        
    } catch (e) {
        
        // case: in image page - not a story
        var translateXPositive = 0;
        var imageWidth = 1;
    } 
            
    // which pic is being showed
    var picNo = translateXPositive / imageWidth;
    
    try {
        var ariaHiddenValue = document.getElementById("react-root").attributes[1].nodeValue;
        
        // case: in instagram profile - in display mode
        if(ariaHiddenValue == "true"){
            var imagePageUrl = location.href;
            chrome.runtime.sendMessage({imagePageUrl: imagePageUrl, picNo: picNo });
        }
        
    } catch (e) {
        // case: in instagram image page
        
        var json = JSON
                        .parse(new RegExp('<script type="text\/javascript">window\._sharedData = (.*);+<\/script>')
                        .exec(document.documentElement.innerHTML)[1]);
        
        var media = json.entry_data.PostPage[0].graphql.shortcode_media;
            
        if(media.__typename == "GraphImage"){
            var photoLink = media.display_url;
        }
        
        if(media.__typename == "GraphSidecar"){
             var photoLink = media.edge_sidecar_to_children.edges[response.picNo].node.display_url;
         }
        
        window.open(photoLink);
        
    }
                      
}
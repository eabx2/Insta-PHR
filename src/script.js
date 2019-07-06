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
                
    // to get second outer div element of the image
    var divs = document.getElementsByClassName("eLAPa RzuR0");
    if(divs.length == 0) var divs = document.getElementsByClassName("eLAPa kPFhm");
    if(divs.length == 0) var divs = document.getElementsByClassName("eLAPa _23QFA");
            
    var divElement = new DOMParser().parseFromString(divs[picNo].innerHTML, 'text/xml');
        
    var photoLink = divElement.getElementsByTagName("img")[0].attributes.src.textContent;
    
    window.open(photoLink);
        
}
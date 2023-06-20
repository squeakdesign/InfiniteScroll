const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader')

let ready=false;
let imagesLoaded=0;
let totalImages=0;

let photosArray=[];



// Unsplash API
const count=30;
const apiKey='cM01xUZ_3I49_vOJJmf5ozYVoSxJuTdxyHhk8f7nMnM';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check all images were loaded
function imageLoaded(){
   
    imagesLoaded++;

    console.log(imagesLoaded);
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
        //console.log('ready',ready);
    }
}



//Helper function to Set Attributes on DOM Elements
function setAttribute(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}





// Create elements for Links& Photos,Add to DOM
function displayPhotos() {
    imagesLoaded=0;
    totalImages=photosArray.length;
    console.log('totalimages',totalImages);

// Run function for each object in photosArray
    photosArray.forEach((photo)=>{
    //create <a> to link to Unsplash
    const item=document.createElement('a');
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target','_blank');
    setAttribute(item,{
        href:photo.links.html,
        target:'_blank'
    });
    
    //create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt',photo.alt_description);
    // img.setAttribute('title',photo.alt_description);
    setAttribute(img,{
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description,
    });
    //EventListener,check when each is finished loading
    img.addEventListener('load',imageLoaded);


    //Put <img> inside <a>,then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);


});


}





// Get photos from Unsplash API
async function getPhotos(){
try {
    const response=await fetch(apiUrl);
    photosArray=await response.json();
    displayPhotos();
   
} catch (error) {
    // catch error here
}


}
//Check to see if scrolling near bottom of page,Load more photos
window.addEventListener('scroll',()=>{
//console.log('scrolled');
if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){

    ready=false;
    getPhotos();
    //console.log('load more');
}


});



// On Load
getPhotos()
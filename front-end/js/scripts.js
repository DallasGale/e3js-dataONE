// jQuery below
$(function() {
  console.log('jquery works');
  $('img').css({
    'display': 'block',
    'maxWidth': '90%',
    'position': 'relative',
    'margin': '0 auto'
  })
});



// fetch DataONE API
const myImage = document.querySelector('img');
let myRequest = new Request('./img/flower.jpg');
console.log('myImage ', myImage);

fetch(myRequest)
  .then( (response) => {
    return response.blob();
    // console.log('myRequest ', myRequest);
})
  .then( (myBlob) => {
    let objectUrl = URL.createObjectURL(myBlob);
    myImage.src = objectUrl;
    console.log('objectUrl', objectUrl);
    console.log(`myImage.src ${myImage.src}`);
});

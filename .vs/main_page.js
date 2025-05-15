//alert ('Here you can find my education');

const ACTIVECLASS = 'active';
const IMAGES = document.querySelectorAll('.flex-card-container');

IMAGES[0].classList.add(ACTIVECLASS);

function removeActiveClass() {
    const elm = document.querySelector(`.${ACTIVECLASS}`);
    if (elm) {
        elm.classList.remove(ACTIVECLASS);
    }
}

function addClass($event) {
    $event.stopPropagation();
    removeActiveClass();
    const target = $event.currentTarget;
    target.classList.add(ACTIVECLASS);
}

IMAGES.forEach(image => {
    image.addEventListener('click', addClass);
});

if(window.navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
    }, err => {
        console.error(err);
    });
} else {
    console.error("Geolocation is not supported by this browser.");
}

// Function to get the user's IP address
function getUserIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log('User  IP Address:', data.ip);
        })
        .catch(err => {
            console.error('Error fetching IP address:', err);
        });
}
getUserIP();


// reveal design

//const revealElements = document.querySelectorAll("[data-reveal]");

//const scrollReveal = function () {
    //for (let i = 0, len = revealElements.length; i < len; i++) {
       // const isElementOnScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight;

       // if (isElementOnScreen) {
          //  revealElements[i].classList.add("revealed")
      //  } else {
       //     revealElements[i].classList.remove("revealed")
      //  }
  //  }
//}

//window.addEventListener("scroll", scrollReveal);
//window.addEventListener("load", scrollReveal);

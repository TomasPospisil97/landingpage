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
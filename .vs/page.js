alert ('Hello Everyone');

//CALCULATOR
let flag=0;
        let output = document.getElementById("ot");
        function display(num){
            if (flag==1)
            {
                output.value="num";
                output.value=num;
                flag=0
            }
            else{
                output.value+= num;
            }    
        }

        function calculate(){
            try {
                output.value = eval(output.value);
                flag =1;
            }
            catch(err)
            {
                output.value="";
                alert("INVALID");
            }
        }

        function del(){
            output.value = output.value.slice(0, -1);      
        }
        
        function clr(){
            output.value = "";
        }

// PRAC.ZKUS. VIEW
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
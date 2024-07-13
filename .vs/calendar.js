//const pro kalendar
const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

//const pro button left side
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");


let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//pridani dnu

function initCalendar(){
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    //pridavani dnu

    let days = "";

    //dny z predchoziho mesice

    for (let x = day ; x > 0 ; x--){
        days += `<div class="day prev-date" >${prevDays - x + 1}</div>`;
    }

    //dny v tomto mesici

    for (let i = 1 ; i<=lastDate; i++){
        //day is today + class today
        if(i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()){
            days += `<div class="day today">${i}</div>`
        }//zbytek
        else{
            days += `<div class="day">${i}</div>`
        }

    }

    //dalsi mesic
    for (let j = 1 ; j<=nextDays ; j++){
        days += `<div class="day next-date">${j}</div>`
    }

    daysContainer.innerHTML = days;

};

initCalendar();


//predchozi mesic

function prevMonth(){
    month --;
    if(month < 0){
        month = 11;
        year --;
    }
    initCalendar();
}

//nasledujici mesic

function nextMonth(){
    month ++;
    if(month > 11){
        month = 0;
        year ++;
    }
    initCalendar();
}

//eventlistener pro predchozi a dalsi mesic

prev.addEventListener("click" , prevMonth);
next.addEventListener("click" , nextMonth);


//goto + goto today funkce

todayBtn.addEventListener("click" , ()=> {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input" , ()=>{
    //pouze pro cisla
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if(dateInput.value.length === 2){
        //po 2 cislech prida lomitko
        dateInput.value += "/";
    }
    if(dateInput.value.length > 7){
        //nepripusti vic jak 7 charakteru = vcetne lomitka
        dateInput.value = dateInput.value.slice(0, 7);
    }
    //nesmaze se vice jak 2 prvni charaktery
    //if(e.inputType === "deleteContentBackward"){
      //  if(dateInput.value.length === 3){
        //    dateInput.value = dateInput.value.slice(0, 2);
        //}
    //}
});

gotoBtn.addEventListener("click" , gotoDate);

//goto urcene datum

function gotoDate(){
    const dateArr = dateInput.value.split("/");
    //date validace
    if(dateArr.length === 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4){
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }

    //pokud je spatne datum
    alert("Invalid date");
}
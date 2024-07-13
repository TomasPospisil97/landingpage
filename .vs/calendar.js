const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");


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

//now we will add days

function initCalendar(){
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    //adding days

    let days = "";

    //prev months

    for (let x = day ; x > 0 ; x--){
        days += `<div class="day prev-date" >${prevDays - x + 1}</div>`;
    }

    //current month days

    for (let i = 1 ; i<=lastDate; i++){
        //if day is today and class today
        if(i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()){
            days += `<div class="day today">${i}</div>`
        }//remaining
        else{
            days += `<div class="day">${i}</div>`
        }

    }

    //next month
    for (let j = 1 ; j<=nextDays ; j++){
        days += `<div class="day next-date">${j}</div>`
    }

    daysContainer.innerHTML = days;

};

initCalendar();
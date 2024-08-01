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
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventSubmit = document.querySelector(".add-event-btn");


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

//default event array

//const eventsArr = [
  //  {
    //    day: 28,
      //  month: 7,
        //year: 2024,
        //events: [
          //  { title: "Event 1", time: "10:00" },
           // { title: "Event 2", time: "12:00" },
        //],
    //},
    //{
      //  day: 18,
        //month: 7,
        //year: 2024,
        //events: [
          //  { title: "Event 1", time: "10:00" },
       // ],
   // },
//];

//empty array
let eventsArr = [];

//call get
getEvents();

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

        //check if the event is present on current day
        let event = false;
        eventsArr.forEach((eventObj) =>{
            if(eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year){
                event = true;
            }
        });


        //day is today + class today
        if(i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()){
            
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            //if event found => add event class
            // add active on today at start

            if(event){
                days += `<div class="day today active event">${i}</div>`
            }else{
                days += `<div class="day today active">${i}</div>`
            }
            //days += `<div class="day today">${i}</div>`
        }//zbytek
        else{
            if(event){
                days += `<div class="day event">${i}</div>`
            }else{
                days += `<div class="day">${i}</div>`
            }
            //days += `<div class="day">${i}</div>`
        }

    }

    //dalsi mesic
    for (let j = 1 ; j<=nextDays ; j++){
        days += `<div class="day next-date">${j}</div>`
    }

    daysContainer.innerHTML = days;

    //add Listner after calendar initializes
    addListner();
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


const addEventBtn = document.querySelector(".add-event");
const addEventContainer = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTitle = document.querySelector(".event-name");
const addEventFrom = document.querySelector(".event-time-from");
const addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click" , ()=>{
    addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click" , ()=>{
    addEventContainer.classList.remove("active");
});

document.addEventListener("click" , (e)=>{
    //if clicked outside
    if(e.target !== addEventBtn && !addEventContainer.contains(e.target)){
        addEventContainer.classList.remove("active");
    }
});

//only 30 char. for title

addEventTitle.addEventListener("input" , (e)=>{
    addEventTitle.value = addEventTitle.value.slice(0, 30);
});

//time format

addEventFrom.addEventListener("input", (e)=>{
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    //adding of :
    if(addEventFrom.value.length === 2){
        addEventFrom.value += ":";
    }
    //not more than 5 char
    if(addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

//same with the to time
addEventTo.addEventListener("input", (e)=>{
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    //adding of :
    if(addEventTo.value.length === 2){
        addEventTo.value += ":";
    }
    //not more than 5 char
    if(addEventTo.value.length > 5){
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});


//function for adding listner on day after rendered

function addListner(){
    const days = document.querySelectorAll(".day");
    days.forEach((day) =>{
        day.addEventListener("click", (e)=> {
            //set current day as active day
            activeDay = Number(e.target.innerHTML)

            //call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            //remove active day from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });

            //if prev month is clicked and goto prev month and add active
            if(e.target.classList.contains("prev-date")) {
                prevMonth();

                setTimeout(() => {
                    //select all days of the that month
                    const days = document.querySelectorAll(".day");

                    //after going to prev month adding active to clicked
                    days.forEach((day) => {
                        if(!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML){
                            day.classList.add("active");
                        }
                    });
                }, 100);
                //same with the next month
            } else if(e.target.classList.contains("next-date")) {
                nextMonth();

                setTimeout(() => {
                    //select all days of the that month
                    const days = document.querySelectorAll(".day");

                    //after going to prev month adding active to clicked
                    days.forEach((day) => {
                        if(!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML){
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                //remaining current month days
                e.target.classList.add("active");
            }


        });
    });
};

//show active day events and date at the top

//const eventDay = document.querySelector(".event-day");
//const eventDate = document.querySelector(".event-date");

function getActiveDay (date){
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
};


//to show events of the day

function updateEvents(date){
    let events = "";
    eventsArr.forEach((event) => {
        //get events on active day only
        if(date === event.day && month + 1 === event.month && year === event.year){
           //show event on document
           event.events.forEach((event) => {
                events += 
                `<div class="event">
                <div class="title">
                  <i class="fas fa-circle"></i>
                  <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
            </div>`;
           });
        }
    });

    //if nothing is found
    if (events === "") {
        events = `<div class="no-event">
                <h3>No Events</h3>
            </div>`;
      }
    eventsContainer.innerHTML = events;

    //save items when newis setup
    saveEvents();

};

//function to add events
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    //validation with if()
    if(eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "" ) {
        alert("Please fill all fields");
        return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if(
        timeFromArr.length !== 2 || 
        timeToArr.length !== 2 || 
        timeFromArr[0] > 23 || 
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 || 
        timeToArr[1] > 59
    ) {
            alert("Invalid time format");
    }
    
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        //time: `${timeFrom} - ${timeTo}`,
        time: timeFrom + " - " + timeTo
    };


    let eventAdded = false;

    //checkif eventarr is not empty
    if(eventsArr.length > 0){
        //check if thereare alreadysome event, add following
        eventsArr.forEach((item) => {
            if(
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ){
                item.events.push(newEvent);
                eventAdded = true;
            }
        })
    };


    //if event array is empty or current day does not haveany events
    if(!eventAdded){
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent]
        })    
    };


    //removeactive from add event form
    addEventContainer.classList.remove("active");

    //clear the fields
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    //show current added event
    updateEvents(activeDay);


    //add event class to new event,if not alreadydone
    const activeDayElem = document.querySelector(".day.active");
    if(!activeDayElem.classList.contains("event")){
        activeDayElem.classList.add("event");
    };

});

function convertTime (time){
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
};


//function to remove event on click
eventsContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("event")){
        const eventTitle = e.target.children[0].children[1].innerHTML;
        //get the title of event => search  in array by title and delete
        eventsArr.forEach((event) => {
            if(
                event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year
            ){
                event.events.forEach((item, index) => {
                    if(item.title === eventTitle){
                        event.events.splice(index, 1);
                    }
                });

                //if no event remains on that day, remove coplete day
                if(event.events.length === 0){
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                    //also remove active class of that day
                    const activeDayElem = document.querySelector(".day.active");
                    if(activeDayElem.classList.contains("event")){
                        activeDayElem.classList.remove("event");
                    }
                }
            }
        });
        //update the events
        updateEvents(activeDay);
    }




});


//store events in local storage and get them from it

function saveEvents(){
    localStorage.setItem("events", JSON.stringify(eventsArr));
};

//function getEvents(){
  //  if(localStorage.getItem("events" === null)){
    //    return;
   // }
    //eventsArr = JSON.parse(localStorage.getItem("events"));
   // eventsArr.push(...JSON.parse(localStorage.getItem("events")));
//};

//this is the same fucntion,but works.. the function before did not work,cause it recieve "null" on every noew load of the page
function getEvents(){
    const storedEvents = localStorage.getItem("events");
    if(storedEvents !== null){
        eventsArr = JSON.parse(storedEvents);
    }
}
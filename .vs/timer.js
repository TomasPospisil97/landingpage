var timeBegan = null; // začal odpočet?
var timeStopped = null; // kdy byl timer zastaven?
var stoppedDuration = 0; // jak dlouho byl timer zastaven
var startInterval = null; // to stop startInterval() method
var flag = false; // kontrola start/stop timeru

const timerContainer = document.getElementsByClassName("timer-container")[0];
timerContainer.addEventListener("click", function()
    {
        if (!flag)
            {
                startTimer();
                flag = true;
            }
            else
            {
                stopTimer();
                flag = false;
            }
    }
);

timerContainer.addEventListener("dblclick", function(){
    resetTimer();
});

function startTimer(){
    if(timeBegan === null)
        timeBegan = new Date();
    if(timeStopped !== null)
        stoppedDuration += (new Date() - timeStopped);

    startInterval = setInterval(clockRunning, 10);
};

function stopTimer(){
    timeStopped = new Date();
    clearInterval(startInterval);
};

function clockRunning(){
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

    var minutes = timeElapsed.getUTCMinutes();
    var seconds = timeElapsed.getUTCSeconds();
    var miliseconds = timeElapsed.getUTCMilliseconds();

    miliseconds = Math.floor(miliseconds / 10);

    document.getElementById("timer-display").innerHTML = 
    (minutes = minutes < 10 ? '0' + minutes:minutes) + ":"+
    (seconds = seconds < 10 ? '0' + seconds:seconds) + ":" +
    (miliseconds = miliseconds < 10 ? '0' + miliseconds:miliseconds)
};

function resetTimer(){
    clearInterval(startInterval);
    timeBegan = null;
    timeStopped = null;
    stoppedDuration = 0;
    document.getElementById("timer-display").innerHTML = "00:00:00";
    flag = false;
};
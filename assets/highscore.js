/* Selcting HTML elements to modify */
hsEl = document.querySelector("#highscore");
gobackEl = document.querySelector("#goback");
clearEl = document.querySelector("#clear");

/* Function to navigate back to the main page */
gobackEl.addEventListener("click", function () {
    console.log("Go back clicked");
    window.location.replace("../index.html");
});

/* Function to clear high scores */
clearEl.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

/* Display time-up aleart when appropriate */
var msg = localStorage.getItem("msg");
var timeUpflag = localStorage.getItem('flag');
if (msg !== "" && timeUpflag) {
    console.log("TYpe of msg: ", typeof (msg), "msgg : ", msg);
    alert(msg);
}
var scoreList = localStorage.getItem("keepScore");
scoreList = JSON.parse(scoreList);

/* Display high scores if available in local storage */
if (scoreList !== null) {
    for (i = 0; i < scoreList.length; i++) {
        console.log("High Score Array", scoreList[i].name, "Score", scoreList[i].score);
        var scoreli = document.createElement("li");
        scoreli.textContent = (scoreList[i].name + ":                " + scoreList[i].score);
        hsEl.appendChild(scoreli);
    }
}


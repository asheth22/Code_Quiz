hsEl = document.querySelector("#highscore");
gobackEl = document.querySelector("#goback"); 
clearEl = document.querySelector("#clear");

gobackEl.addEventListener("click", function () {
    console.log("Go back clicked");
    window.location.replace("../index.html");
    });  

clearEl.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
    }); 

var scoreList = localStorage.getItem("keepScore"); 
scoreList = JSON.parse(scoreList);

if (scoreList !== null) {
for (i=0; i<scoreList.length; i++) {
   console.log("High Score Array", scoreList[i].name, "Score", scoreList[i].score);
   var scoreli = document.createElement("li");
   scoreli.textContent =  (scoreList[i].name + ":                " + scoreList[i].score);
   hsEl.appendChild(scoreli); 
   }
}


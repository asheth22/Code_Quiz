/* Defining Question Bank */
var qBank = [
    {
        question: "HTML stands for: ",
        choices: ["Home Tool Madeup Language", "Hyperlinks Text Makeup Language", "Hyper Text Markup Language", "High Tech Markup Language"],
        answer: "Hyper Text Markup Language",
    },

    {
        question: "Which of the following is NOT a javascript datatype? ",
        choices: ["string", "number", "table", "boolean"],
        answer: "table",
    },

    {
        question: "Which of the following is a component of CSS style rule?",
        choices: ["Selector", "Property", "Value", "All of the above"],
        answer: "All of the above",
    },

    {
        question: "Which method is used to create a new HTML element through javascript?",
        choices: ["createElement", "elementCreate", "addNewelement", "newElementadd"],
        answer: "createElement",
    },

    {
        question: "Javascript Math.random() returns: ",
        choices: ["random number between 0 and infinity", "random number between 0 and 1", "whole numbers", "None of the above"],
        answer: "random number between 0 and 1",
    }
]

/* Selecting html elements */
var timeleft = document.querySelector("#timeleft");
var startquiz = document.querySelector("#startquiz");
var quizSec = document.querySelector(".quiz-section")
var container = document.querySelector(".container");
var response = document.querySelector(".validate");
var timeUp = document.querySelector("#Time-up");

/* Defining gl0bal variables */
var qIndex = 0;
var score = 0;
var timer = 75;
var holdInterval = 0;
var penalty = 10;
var scoreList = [];
var setInt;
var timeUpflag = false;

startquiz.addEventListener('click', function (event) {
    event.preventDefault();
    setInt = setInterval(interval, 1000);

    presentquestions(qIndex);
});
localStorage.removeItem('flag');

/* Funtion to check the timer */
function interval() {

    timer--;
    timeleft.textContent = "Time left:  " + timer + "s";
    if (timer <= 0) {
        console.log("0", timeUp);
        var msg = 'Time Up!! Click "Go Back" and take the quiz again!';
        timeUpflag = true;
        localStorage.setItem('flag', timeUpflag);
        localStorage.setItem('msg', msg);
        clearInterval(setInt);
        window.location.replace("./assets/highscores.html");

    }
}
/*  Function to present questions and multiple choice answsers to user */
function presentquestions(i) {
    if (localStorage.getItem('msg') !== null) {
        localStorage.removeItem('msg');
        console.log("local storage msg removed");
    }
    quizSec.innerHTML = "";

    var userQ = qBank[i].question;
    var userC = qBank[i].choices;

    console.log("Question is: ", userQ);
    quizSec.textContent = userQ;

    var ul = document.createElement("ul");
    quizSec.appendChild(ul);
    for (j = 0; j < userC.length; j++) {
        var buttonEl = document.createElement('BUTTON');
        var linebreak = document.createElement('br')
        ul.appendChild(linebreak);
        ul.appendChild(buttonEl);

        buttonEl.textContent = userC[j];
        buttonEl.setAttribute('id', j);
        buttonEl.setAttribute('class', "ansbtn");
    }
    var btnList = document.querySelector("ul");
    console.log("btnEl Created ", btnList);
    btnList.addEventListener('click', function (event) {
        console.log(event);
        event.preventDefault();
        if (event.target.matches("button")) {
            console.log(event.target.id);
            var index = parseInt(event.target.id);

            console.log("Correct Answer: ", qBank[i].answer);
            console.log("User Answer: ", userC[index]);

            if ((userC[index]) === qBank[i].answer) {
                console.log("Inside if loop");
                response.textContent = "Correct Answer";
                score++;
            }
            else {
                console.log("Inside else loop");
                response.innerHTML = "Wrong Answer";
                timer = timer - 15;
            }
            qIndex++;
            console.log("Index is: ", qIndex);
            if (qIndex < 5) {
                presentquestions(qIndex);
            }
            else {
                console.log("Questions Correct: ", score);
                alldone(timer);
            }
        }
    });

    /*  Function to dynamically create the page so user can submit high scores */
    function alldone(timer) {
        console.log("score passed to alldone: ", timer);
        /*  clearInterval(setInt);
          */
        quizSec.innerHTML = "";
        response.innerHTML = "";
        var h4El = document.createElement("h4"); ``
        quizSec.appendChild(h4El);
        h4El.textContent = "All Done!!";

        var pEl = document.createElement("p");
        quizSec.appendChild(pEl);
        pEl.textContent = "Your Score is " + timer;


        var labelEl = document.createElement("label");
        labelEl.setAttribute("id", "createLabel");
        labelEl.textContent = "Enter your initials: ";

        quizSec.appendChild(labelEl);

        // input
        var InputEl = document.createElement("input");
        InputEl.setAttribute("type", "text");
        InputEl.setAttribute("id", "initials");
        InputEl.textContent = "";

        quizSec.appendChild(InputEl);

        // submit
        var SubmitEl = document.createElement("button");
        SubmitEl.setAttribute("type", "submit");
        SubmitEl.setAttribute("id", "Submit");
        SubmitEl.textContent = "Submit";

        quizSec.appendChild(SubmitEl);

        /*  Function to Submit high scores */

        SubmitEl.addEventListener('click', function () {

            var initials = InputEl.value;
            var str;

            if (initials === "") {
                alert("Please enter initials to save scores");
            }
            else {
                console.log("type of initials: ", typeof (initials), initials);
                if (localStorage.getItem("keepScore") === null) {
                    scoreList.push({ name: initials, score: timer });
                    str = JSON.stringify(scoreList)
                    localStorage.setItem("keepScore", str);
                }
                else {
                    str = localStorage.getItem("keepScore");
                    str = JSON.parse(str);
                    str.push({ name: initials, score: timer });
                    scoreList = str;
                    str = JSON.stringify(str);
                    localStorage.setItem("keepScore", str);
                }
                window.location.replace("./assets/highscores.html");
            };
        });
    }
}               
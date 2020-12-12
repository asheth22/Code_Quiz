/* Defining question and answer choices */
var qBank = [
    {
    question: "HTML stands for: ",
    choices: ["Home Tool Madeup Language", "Hyperlinks Text Makeup Language", "Hyper Text Markup Language", "High Tech Markup Langugae"],
    answer: "Hyper Text Narkup Language",
    },

    {
    question: "Which of the following is NOT a javascript datatype ",
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
    answer: "random number between 0 and infinity",     
    }
 ]  

 /* Selecting html elements */
var startquiz = document.querySelector("#startquiz");
var container = document.querySelector(".container");
var tineleft = document.querySelector("#timeleft");
/* Defining gl0bal variables */
var index = 0;
var score = 0;
var timer = 75;
var holdInterval = 0;
var penalty = 10;
  


startquiz.addEventListener('click', function(event) {
    event.preventDefault();
    setInterval(function() {
        timer--;
        timeleft.textContent = "Tine left:  " + timer + "s";
        if (timer < 0) {
            timeleft.textContent = "Time is ip";
        }
    }, 1000);
    presentquestions();
    }
)

function presentquestions() {
    /* for (i=0; i<qBank.length; i++) { */
        container.innerHTML = "";
        var i=0;
        var userQ = qBank[i].question;
        var userC = qBank[i].choices;
        var userA = (qBank[i].answer).toString;
        console.log("Question is: " , userQ);
        
        container.innerHTML = userQ;
        
        var ul = document.createElement("ul"); 
        container.appendChild(ul);
        for (j=0; j<userC.length; j++) {
            var li = document.createElement('li');
            ul.appendChild(li);
            li.textContent = userC[j];
            li.setAttribute('id', j);
            console.log(li);
            }
        var listEl = document.querySelector("ul");    
        listEl.addEventListener('click', function(event) {
            event.preventDefault();
            if(event.target.matches("li")) {
                console.log(event.target.id); 
               var index = parseInt(event.target.id); 
               var response = document.createElement("div"); 
                container.appendChild(response);
                console.log("Correct Answer: ", userA);
                console.log("User Answer: ", userC[index]);

               if((userC[index]).toString === userA) {
                response.textContent = "Correct Answer";
                score++;
               }
               else {
                response.textContent = "Wrong Answer";
                timer = timer -10;
               }
              }            
        })
    /* } */

}



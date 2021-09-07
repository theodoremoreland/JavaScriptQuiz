import questions from "../data/questions.js" ;
import { decrementCountdown } from "./scripts/decrementCountdown.js";
import { renderQuestion } from "./scripts/renderQuestion.js";
import { renderGameOverView } from "./scripts/renderGameOverView.js";

const spanElementWithCountdownText = document.querySelector("span[data-countdown]");
const spanElementWithViewHighScoresText = document.querySelector("span#viewHighscores");
const mainElement = document.querySelector("main");
const answerOutputSectionElement = document.querySelector("#answerOutputSection");
const answerOutputElement = answerOutputSectionElement.querySelector("output");
const audioElement = document.querySelector("audio");
let countdownIntervalID; // Declaring variable for intervalId in global-ish scope.
let resetOutputTimeoutID; // Declaring variable for timeoutId in global-ish scope.
let currentQuestionIndex = 0;

// Set starting countdown value equal to data attribute in HTML
spanElementWithCountdownText.textContent = spanElementWithCountdownText.dataset.countdown;

const handleClick = (event) => {
    event.stopPropagation();
    const clickedElement = event.target;
    
    if (clickedElement.matches("#startQuizButton")) {
        startQuiz();
    } 
    else if (clickedElement.matches("li")) {
        const chosenAnswer = clickedElement.dataset.option;
        if (resetOutputTimeoutID) clearTimeout(resetOutputTimeoutID);

        if (chosenAnswer === questions[currentQuestionIndex].answer) {
            audioElement.src = "/assets/sounds/correct.wav";
            audioElement.play();
            answerOutputElement.textContent = "CORRECT!";
        }
        else {
            audioElement.src = "/assets/sounds/wrong.mp3";
            audioElement.play();
            answerOutputElement.textContent = "WRONG!";
            decrementCountdown(spanElementWithCountdownText, endQuiz , 15);
        };

        resetOutputTimeoutID = setTimeout(() => answerOutputElement.textContent = "", 1_200);
        currentQuestionIndex++;
        const nextQuestion = questions[currentQuestionIndex];

        if (nextQuestion) renderQuestion(mainElement, nextQuestion);
        else endQuiz();
    }
};

const startQuiz = () => {
    const firstQuestion = questions[currentQuestionIndex];
    countdownIntervalID = setInterval(() => decrementCountdown(spanElementWithCountdownText, endQuiz), 1_000);
    
    answerOutputSectionElement.setAttribute("style", "display: block;");

    renderQuestion(mainElement, firstQuestion);
};

const endQuiz = () => {
    const finalScore =  spanElementWithCountdownText.dataset.countdown;

    clearInterval(countdownIntervalID);
    audioElement.src = "/assets/sounds/game-over.wav";
    audioElement.play();
    renderGameOverView(mainElement, finalScore);
};

const renderHighScoresView = () => {
    mainElement.innerHTML = "";
    answerOutputSectionElement.setAttribute("style", "display: none;");

    const highscores = JSON.parse(localStorage.getItem("highscores") || "[]").sort((a, b) => b.score - a.score);
    const header = document.createElement("h1");
    const ol = document.createElement("ol");
    const goBackButton = document.createElement("button");
    const clearHighScoresButton = document.createElement("button");

    header.textContent = "Highscores";
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", () => location.reload(),  { once : true });
    clearHighScoresButton.textContent = "Clear Highscores";
    clearHighScoresButton.addEventListener("click", () => {
        localStorage.setItem("highscores", JSON.stringify([]));
        renderHighScoresView();
    }, { once : true });

    for (const record of highscores) {
        const li = document.createElement("li");
        li.setAttribute("class", "highscore");
        li.textContent = `${record.initials} - ${record.score}`;
        ol.appendChild(li);
    }

    mainElement.appendChild(header);
    mainElement.appendChild(ol);
    mainElement.appendChild(goBackButton);
    mainElement.appendChild(clearHighScoresButton);
};

mainElement.addEventListener("click", handleClick);
spanElementWithViewHighScoresText.addEventListener("click", renderHighScoresView);
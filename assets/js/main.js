import questions from "../data/questions.js" ;
import { decrementCountdown } from "./scripts/decrementCountdown.js";
import { renderQuestion } from "./scripts/renderQuestion.js";
import { renderGameOverView } from "./scripts/renderGameOverView.js";
import { renderHighScoresView } from "./scripts/renderHighScoresView.js";

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
    else if (clickedElement.matches(".question.option")) {
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

mainElement.addEventListener("click", handleClick);

spanElementWithViewHighScoresText.addEventListener("click", () => {
    answerOutputSectionElement.setAttribute("style", "display: none;");
    renderHighScoresView(mainElement);
});
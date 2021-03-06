import questions from "../data/questions.js" ;
import { chooseRandomQuestion } from "./scripts/chooseRandomQuestion.js";
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
const questionIndexesPreviouslyUsed = []; // Aids in keeping track of what questions were already asked.
let countdownIntervalID; // Declaring variable for intervalId in global-ish scope.
let resetOutputTimeoutID; // Declaring variable for timeoutId in global-ish scope.

// Set starting countdown value equal to data attribute in HTML
spanElementWithCountdownText.textContent = spanElementWithCountdownText.dataset.countdown;

const startQuiz = () => {
    const firstQuestion = chooseRandomQuestion(questions.medium, questionIndexesPreviouslyUsed);
    countdownIntervalID = setInterval(() => decrementCountdown(spanElementWithCountdownText, endQuiz), 1_000);
    
    answerOutputSectionElement.setAttribute("style", "display: block;");
    renderQuestion(mainElement, firstQuestion);
};

const endQuiz = (reason) => {
    const finalScore =  spanElementWithCountdownText.dataset.countdown;

    clearInterval(countdownIntervalID);

    if (reason === "out of time") {
        audioElement.src = "assets/sounds/game-over.wav";
        audioElement
            .play()
            .catch(e => {
                // AbortError occurs when one sound interrupts another via .play() on the same audio element
                // This is expected and intentional, so this will suppress the error.
                if (e.name !== "AbortError") console.error(e);
            });
    }

    renderGameOverView(mainElement, finalScore);
};

const handleClick = (event) => {
    event.stopPropagation();
    const clickedElement = event.target;
    
    if (clickedElement.matches("#startQuizButton")) {
        startQuiz();
    } 
    else if (clickedElement.matches(".answer.option")) {
        const chosenAnswer = clickedElement.dataset.option;
        
        if (resetOutputTimeoutID) clearTimeout(resetOutputTimeoutID);

        if (chosenAnswer === questions.medium[questionIndexesPreviouslyUsed[0]].correctAnswer) {
            audioElement.src = "assets/sounds/correct.wav";
            audioElement
                .play()
                .catch(e => {
                    // AbortError occurs when one sound interrupts another via .play() on the same audio element
                    // This is expected and intentional, so this will suppress the error.
                    if (e.name !== "AbortError") console.error(e);
                });
            answerOutputElement.textContent = "CORRECT!";
        }
        else {
            audioElement.src = "assets/sounds/wrong.mp3";
            audioElement
                .play()
                .catch(e => {
                    // AbortError occurs when one sound interrupts another via .play() on the same audio element
                    // This is expected and intentional, so this will suppress the error.
                    if (e.name !== "AbortError") console.error(e.name, e.message);
                });
            answerOutputElement.textContent = "WRONG!";
            decrementCountdown(spanElementWithCountdownText, endQuiz , 15);
        };

        resetOutputTimeoutID = setTimeout(() => answerOutputElement.textContent = "", 1_200);
        const nextQuestion = chooseRandomQuestion(questions.medium, questionIndexesPreviouslyUsed);

        if (nextQuestion) renderQuestion(mainElement, nextQuestion);
        else endQuiz();
    }
};

mainElement.addEventListener("click", handleClick);

spanElementWithViewHighScoresText.addEventListener("click", () => {
    answerOutputSectionElement.setAttribute("style", "display: none;");
    renderHighScoresView(mainElement);
});
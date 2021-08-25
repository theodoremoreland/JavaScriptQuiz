import questions from "../data/questions.js" ;

const spanElementWithCountdownText = document.querySelector("span[data-countdown]");
const spanElementWithViewHighScoresText = document.querySelector("span#viewHighscores");
const mainElement = document.querySelector("main");

// Set starting countdown value equal to data attribute in HTML
spanElementWithCountdownText.textContent = spanElementWithCountdownText.dataset.countdown;

// Declaring variable for intervalId in global-ish scope.
let countdownIntervalID;
let currentQuestionIndex = 0;

const handleClick = (event) => {
    event.stopPropagation();
    const clickedElement = event.target;
    
    if (clickedElement.matches("#startQuizButton")) {
        startQuiz();
    } 
    else if (clickedElement.matches("li")) {
        const chosenAnswer = clickedElement.dataset.option;

        if (chosenAnswer === questions[currentQuestionIndex].answer) {
            alert("Correct!");
        }
        else {
            decrementCountdown(10);
        };

        currentQuestionIndex++;
        const nextQuestion = questions[currentQuestionIndex];

        if (nextQuestion) renderQuestion(nextQuestion);
        else endQuiz();
    }
};

const startQuiz = () => {
    countdownIntervalID = setInterval(() => decrementCountdown(), 1_000);
    renderQuestion(questions[currentQuestionIndex]);
};

const decrementCountdown = (decrementAmount = 1) => {
    const currentCountdownValue = spanElementWithCountdownText.dataset.countdown;
    
    if (currentCountdownValue <= 0) {
        endQuiz();
    } else {
        spanElementWithCountdownText.textContent = spanElementWithCountdownText.dataset.countdown -= decrementAmount;
    }
};

const renderQuestion = ({label, options }) => {
    mainElement.innerHTML = "";

    const header = document.createElement("h1");
    const ol = document.createElement("ol");
    const hr = document.createElement("hr");

    header.setAttribute("class", "question label");
    header.textContent = label;

    mainElement.appendChild(header);

    for (const option of options) {
        const li = document.createElement("li");
        li.setAttribute("class", "question option");
        li.dataset.option = option;
        li.textContent = option;
        ol.appendChild(li);
    };

    mainElement.appendChild(ol);
    mainElement.appendChild(hr);
};

const endQuiz = () => {
    clearInterval(countdownIntervalID);
    alert("Quiz over!");
};

mainElement.addEventListener("click", handleClick);
import questions from "../data/questions.js" ;

const spanElementWithCountdownText = document.querySelector("span[data-countdown]");
const spanElementWithViewHighScoresText = document.querySelector("span#viewHighscores");
const mainElement = document.querySelector("main");
const answerOutputSectionElement = document.querySelector("#answerOutputSection");
const answerOutputElement = answerOutputSectionElement.querySelector("output");
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
            answerOutputElement.textContent = "CORRECT!";
        }
        else {
            answerOutputElement.textContent = "WRONG!";
            decrementCountdown(15);
        };

        resetOutputTimeoutID = setTimeout(() => answerOutputElement.textContent = "", 1_200);
        currentQuestionIndex++;
        const nextQuestion = questions[currentQuestionIndex];

        if (nextQuestion) renderQuestion(nextQuestion);
        else endQuiz();
    }
};

const startQuiz = () => {
    countdownIntervalID = setInterval(() => decrementCountdown(), 1_000);
    const firstQuestion = questions[currentQuestionIndex];
    answerOutputSectionElement.setAttribute("style", "display: block;");

    renderQuestion(firstQuestion);
};

const decrementCountdown = (decrementAmount = 1) => {
    const currentCountdownValue = spanElementWithCountdownText.dataset.countdown;
    
    if (currentCountdownValue <= 0) {
        endQuiz();
    } else {
        spanElementWithCountdownText.textContent = spanElementWithCountdownText.dataset.countdown -= decrementAmount;
    }
};

const renderQuestion = ({label, options}) => {
    mainElement.innerHTML = "";

    const header = document.createElement("h1");
    const ol = document.createElement("ol");

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
};

const endQuiz = () => {
    clearInterval(countdownIntervalID);
    renderGameOverView();
};

const renderGameOverView = () => {
    mainElement.innerHTML = "";

    const finalScore =  spanElementWithCountdownText.dataset.countdown;
    const header = document.createElement("h1");
    const p = document.createElement("p");
    const form = document.createElement("form");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const submitButton = document.createElement("button");
    const goBackButton = document.createElement("button");
    

    header.setAttribute("class", "question label");
    header.textContent = "All done!";
    p.textContent = `Your final score is: ${finalScore}.`;
    label.setAttribute("for", "initials");
    label.textContent = "Enter initials:";
    input.setAttribute("type", "text");
    input.setAttribute("id", "initials");
    input.setAttribute("name", "initials");
    submitButton.setAttribute("id", "submitHighScoreButton");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        let highscores = JSON.parse(localStorage.getItem("highscores") || "[]");
        const initials = input.value;
    
        highscores = [...highscores, {initials, score: finalScore}].sort((a, b) => b.score - a.score);

        localStorage.setItem("highscores", JSON.stringify(highscores));
        renderHighScoresView();
    }, { once : true });
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", () => location.reload(),  { once : true });

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(submitButton);
    form.appendChild(goBackButton);

    mainElement.appendChild(header);
    mainElement.appendChild(p);
    mainElement.appendChild(form);
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
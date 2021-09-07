export const renderGameOverView = (renderElement, finalScore) => {
    renderElement.innerHTML = "";

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

    renderElement.appendChild(header);
    renderElement.appendChild(p);
    renderElement.appendChild(form);
};
import { submitHighScore } from "./submitHighScore.js";

export const renderGameOverView = (renderElement, finalScore) => {
    renderElement.innerHTML = "";

    const header = document.createElement("h1");
    const p = document.createElement("p");
    const form = document.createElement("form");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const submitButton = document.createElement("button");
    const goBackButton = document.createElement("button");
    
    // Manipulate header
    header.setAttribute("class", "question label");
    header.textContent = "All done!";

    // Manipulate paragraph
    p.textContent = `Your final score is: ${finalScore}.`;

    // Manipulate label
    label.setAttribute("for", "initials");
    label.textContent = "Enter initials:";

    // Manipulate input
    input.setAttribute("type", "text");
    input.setAttribute("id", "initials");
    input.setAttribute("name", "initials");

    // Manipulate submit button
    submitButton.setAttribute("id", "submitHighScoreButton");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        submitHighScore(renderElement, input, finalScore);
    }, { once : true });

    // Manipulate go back button
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
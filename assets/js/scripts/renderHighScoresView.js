export const renderHighScoresView = (renderElement) => {
    renderElement.innerHTML = "";

    const highscores = JSON.parse(localStorage.getItem("highscores") || "[]").sort((a, b) => b.score - a.score);
    const header = document.createElement("h1");
    const ol = document.createElement("ol");
    const goBackButton = document.createElement("button");
    const clearHighScoresButton = document.createElement("button");

    // Manipulate header
    header.textContent = "Highscores";

    // Manipulate go back button
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", () => location.reload(),  { once : true });

    // Manipulate clear high scores button
    clearHighScoresButton.textContent = "Clear Highscores";
    clearHighScoresButton.addEventListener("click", () => {
        localStorage.setItem("highscores", JSON.stringify([]));
        renderHighScoresView(renderElement);
    }, { once : true });

    for (const record of highscores) {
        const li = document.createElement("li");
        li.setAttribute("class", "highscore");
        li.textContent = `${record.score} (${record.initials})`;
        ol.appendChild(li);
    }

    renderElement.appendChild(header);
    renderElement.appendChild(ol);
    renderElement.appendChild(goBackButton);
    renderElement.appendChild(clearHighScoresButton);
};
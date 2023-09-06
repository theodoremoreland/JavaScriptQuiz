import { renderHighScoresView } from "./renderHighScoresView.js";

export const submitHighScore = (renderElement, finalScore) => {
    const initialsElement = document.querySelector("#initials");
    const initials = initialsElement?.value;
    let highscores = JSON.parse(localStorage.getItem("highscores") || "[]");
    
    highscores = [...highscores, {initials, score: finalScore}].sort((a, b) => b.score - a.score);

    localStorage.setItem("highscores", JSON.stringify(highscores));

    renderHighScoresView(renderElement);
};
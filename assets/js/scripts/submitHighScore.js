import { renderHighScoresView } from "./renderHighScoresView.js";

export const submitHighScore = (renderElement, input, finalScore) => {
    const initials = input.value;
    let highscores = JSON.parse(localStorage.getItem("highscores") || "[]");
    
    highscores = [...highscores, {initials, score: finalScore}].sort((a, b) => b.score - a.score);

    localStorage.setItem("highscores", JSON.stringify(highscores));
    renderHighScoresView(renderElement);
};
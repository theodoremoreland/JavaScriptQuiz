export const decrementCountdown = (elementWithCountdownText, callback, decrementAmount = 1) => {
    const currentCountdownValue = elementWithCountdownText.dataset.countdown;
    
    if (currentCountdownValue <= 0) {
        callback();
    } else {
        elementWithCountdownText.textContent = elementWithCountdownText.dataset.countdown -= decrementAmount;
    }
};
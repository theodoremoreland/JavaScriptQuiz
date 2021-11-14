/**
 * Chooses a random question from array then adds selected index to record.
 * @param {Array<Object>} questions - Array of question objects.
 * @param {Array<Number>} questionIndexesPreviouslyUsed - Record of all indexes previously chosen from randomized process. Should be passed in as empty.
 * @returns Question object (after adding selected index to array passed in via second argument).
 */
export const chooseRandomQuestion = (questions, questionIndexesPreviouslyUsed) => {
    if (questionIndexesPreviouslyUsed.length === questions.length) {
        return undefined;
    }

    let randomIndex = Math.floor(Math.random() * questions.length);

    while (questionIndexesPreviouslyUsed.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * questions.length);
    }

    questionIndexesPreviouslyUsed.unshift(randomIndex);

    return questions[randomIndex];
};
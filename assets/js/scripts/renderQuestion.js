export const renderQuestion = (elementWithQuestion, {label, options}) => {
    elementWithQuestion.innerHTML = "";

    const header = document.createElement("h1");
    const ol = document.createElement("ol");

    header.setAttribute("class", "question label");
    header.textContent = label;

    elementWithQuestion.appendChild(header);

    for (const option of options) {
        const li = document.createElement("li");
        li.setAttribute("class", "answer option");
        li.dataset.option = option;
        li.textContent = option;
        ol.appendChild(li);
    };

    elementWithQuestion.appendChild(ol);
};
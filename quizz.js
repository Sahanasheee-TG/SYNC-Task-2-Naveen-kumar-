const questions = [
    {
        question: "Javascript is an _______ language?",
        answers: [
            { text: "Object-Oriented", correct: true},
            { text: "Object-Based", correct: false},
            { text: "Procedural", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "How can a datatype be declar to be a constant type?",
        answers: [
            { text: "var", correct: false},
            { text: "let", correct: false},
            { text: "constant", correct: false},
            { text: "const", correct: true},
        ]
    },
    {
        question: "Which of the following is not a javascript framework?",
        answers: [
            { text: "Node", correct: false},
            { text: "Vue", correct: false},
            { text: "Cassandra", correct: true},
            { text: "React", correct: false},
        ]
    },
    {
        question: "How to stop an interval timer in javascript?",
        answers: [
            { text: "clearinterval", correct: true},
            { text: "clearTimer", correct: false},
            { text: "intervalOver", correct: false},
            { text: "None of the above", correct: false},
        ]
    },

]   ;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You Participated Well...';
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();

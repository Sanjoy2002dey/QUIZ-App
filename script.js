const questions =[
    {
        question: "Who is the only cricketer to have scored 10,000 runs and taken 500 wickets in Test cricket?",
        answers:[
            {text: "Jacques Kallis", correct: true},
            {text: "Kapil Dev", correct: false},
            {text: "Ian Botham", correct: false},
            {text: "Shahid Afridi", correct: false},
        ]
    },
    {
        question: "What is the capital city of India?",
        answers:[
            {text: "Mumbai", correct: false},
            {text: "Delhi", correct: true},
            {text: "Kolkata", correct: false},
            {text: "Chennai", correct: false},
        ]
    },
    {
        question: "Who wrote the Indian national anthem, 'Jana Gana Mana'?",
        answers:[
            {text: "Subhas Chadra Bose", correct: false},
            {text: "Mahatma Gandhi", correct: false},
            {text: "Jawaharlal Nehru", correct: false},
            {text: "Rabindranath Tagore", correct: true},
        ]
    },
    {
        question: "Which mountain range separates India from the rest of Asia?",
        answers:[
            {text: "Western Ghats", correct: false},
            {text: "Himalayas", correct: true},
            {text: "Aravalli Range", correct: false},
            {text: "Eastern Ghat", correct: false},
        ]
    },
    {
        question: "Which Indian state is known as the 'Land of Five Rivers'?",
        answers:[
            {text: "West Bengal", correct: false},
            {text: "Gujrat", correct: false},
            {text: "Punjab", correct: true},
            {text: "Bihar", correct: false},
        ]
    },
];

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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
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

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");

    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try again";
    nextButton.style.display = "block"
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
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();


const questions = [
   {
      img: './img/Q1.jpg',
      question: 'What’s the national flower of Japan?',
      answers: ['Sunflower', 'Cherry blossom', 'Magnolia', 'Water Lily'],
      correct: 1,
   },
   {
      img: './img/Q2.jpg',
      question: 'What’s the smallest country in the world?',
      answers: ['China', 'Finland', 'Monaco', 'Vatican'],
      correct: 3,
   },
   {
      img: './img/Q3.jpg',
      question: 'Name the best-selling book series of the 21st century?',
      answers: ['Harry Potter', 'On Writing', 'Life of Pi', 'This Tender Land'],
      correct: 0,
   },
   {
      img: './img/Q4.jpg',
      question: 'How many keys does a classic piano have? ',
      answers: ['79', '90', '88', '84'],
      correct: 2,
   },
   {
      img: './img/Q5.jpg',
      question: 'What was the clothing company Nike originally called? ',
      answers: ['Black Ribbon Sports', 'Blue Ribbon Sports', 'White Ribbon Sports', 'Red Ribbon Sports'],
      correct: 2,
   },
];

const startMenu = document.querySelector('.quiz__startup');
const quizMenu = document.querySelector('.quiz__questions');
const questionsNumber = document.querySelector('.questions__total-number');
const questionsImage = document.querySelector('.questions__image');
const questionsQuestion = document.querySelector('.questions__question');
const questionsAnswers = document.querySelector('.questions__answers');
const startBtn = document.querySelector('.startup__button');
const nextBtn = document.querySelector('.questions__button');
const questionsContainer = document.querySelector('.questions__container');
const finishWindow = document.querySelector('.questions__game-over');
const finishText = document.querySelector('.game-over__text');
const finishButton = document.querySelector('.game-over__button');

let correctAnswer = 0;
let questionsCounter = 0;
let availableQuestions = [];
let availableOption = [];
let currentQuestion;

const setAvailableQuestions = () => {
   questions.forEach( item => {
      availableQuestions.push(item);
   })
};

const getAvailableQuestions = () => {
   questionsNumber.textContent = `Questions ${questionsCounter + 1} of ${questions.length}`;
   const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
   currentQuestion = questionIndex;
   questionsQuestion.innerHTML = currentQuestion.question;

   questionsImage.innerHTML = `<img src=${currentQuestion.img} alt=${Image}>`

   const numberOfQuestions = availableQuestions.indexOf(questionIndex);
   availableQuestions.splice(numberOfQuestions, 1);

   const optionLength = currentQuestion.answers.length;
   for(let i = 0; i < optionLength; i++ ) {
      availableOption.push(i)
   };

   questionsAnswers.innerHTML = '';
   
   for(let i = 0; i < optionLength; i++ ) {
      const optionIndex = availableOption[Math.floor(Math.random() * availableOption.length)];
      const numberOfoption = availableOption.indexOf(optionIndex);
      availableOption.splice(numberOfoption, 1);
      const option = document.createElement('div');
      option.innerHTML = currentQuestion.answers[optionIndex];
      option.id = optionIndex;
      option.className = ('questions__answer');
      questionsAnswers.appendChild(option);
      option.setAttribute('onclick', 'getresult(this)');
   };

   questionsCounter++;
};

const getresult = (element) => {
   const id = parseInt(element.id);
   const correct = currentQuestion.correct;
   questionsAnswers.classList.add('disable')
   if (id === correct) {
      element.classList.add('correct')
      correctAnswer++;
   } else {
      element.classList.add('wrong')
   }
}

startBtn.addEventListener('click', function() {
   startMenu.style.display = 'none';
   quizMenu.style.display = 'flex';
   setAvailableQuestions();
   getAvailableQuestions();
});

nextBtn.addEventListener('click',function(){
   if (questionsCounter == questions.length) {
      quizMenu.style.display = 'none';
      finishWindow.style.display = 'flex';
      finishText.textContent = `Congratulations! Correct answers is ${correctAnswer} of ${questions.length}`
   } else {
      if (questionsAnswers.classList.contains('disable')) {
         getAvailableQuestions();
         questionsAnswers.classList.remove('disable')
      } else {
         alert('Choise some answer')
      }
   }
});

finishButton.addEventListener('click', function() {
   window.location.reload();
})
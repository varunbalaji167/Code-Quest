const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

/* setting 20 hard-coded questions along with 4 choices
 and correct answer*/
let questions = [
  {
    question: "What does HTML stand for?",
    choice1: "Hyper Transfer Markup Language",
    choice2: "Hyper Text Makeup Language",
    choice3: "Hyper Text Markup Language",
    choice4: "Hyper Transfer Makeup Language",
    answer: 3
  },
  {
    question:
      "Which tag is used to create a hyperlink in HTML?",
    choice1: "<link>",
    choice2: "<a>",
    choice3: "<href>",
    choice4: "<hyperlink>",
    answer: 2
  },
  {
    question: "What is the purpose of the <head> tag in HTML?",
    choice1: "Defines the main content of the document",
    choice2: "Contains metadata about the document",
    choice3: "Defines a header for a document or section",
    choice4: "Represents a paragraph in HTML",
    answer: 2
  },
  {
    question: "Which HTML element is used to define the structure of an HTML document?",
    choice1: "<structure>",
    choice2: "<html>",
    choice3: "<document>",
    choice4: "<body>",
    answer: 2
  },
  {
    question: "Which property is used to change the background color in CSS?",
    choice1: "color",
    choice2: "background-color",
    choice3: "text-color",
    choice4: "bgcolor",
    answer: 2
  },
  {
    question: "What does CSS stand for?",
    choice1: "Creative Style Sheets",
    choice2: "Computer Style Sheets",
    choice3: "Cascading Style Sheets",
    choice4: "Colorful Style Sheets",
    answer: 3
  },
  {
    question: "Which CSS property is used to set the text size?",
    choice1: "font-size",
    choice2: "text-size",
    choice3: "size",
    choice4: "text-font",
    answer: 1
  },
  {
    question: "How can you center an element horizontally in CSS?",
    choice1: "align: center",
    choice2: "margin: auto",
    choice3: "center: horizontal",
    choice4: "float: center",
    answer: 2
  },
  {
    question: "Which CSS property is used for styling links?",
    choice1: "link-style",
    choice2: "a-style",
    choice3: "text-decoration",
    choice4: "link-decoration",
    answer: 3
  },
  {
    question: "What does JavaScript primarily provide on a webpage?",
    choice1: "Styling",
    choice2: "Interactivity",
    choice3: "Structure",
    choice4: "Design",
    answer: 2
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    choice1: "var",
    choice2: "variable",
    choice3: "let",
    choice4: "variable",
    answer: 3
  },
  {
    question: "What is the purpose of the addEventListener method in JavaScript?",
    choice1: "To add an element to the DOM",
    choice2: "To execute a function when an event occurs",
    choice3: "To create an array in JavaScript",
    choice4: "To define a new variable",
    answer: 2
  },
  {
    question: "Which statement is used to exit a loop prematurely in JavaScript?",
    choice1: "break",
    choice2: "exit",
    choice3: "return",
    choice4: "continue",
    answer: 1
  },
  {
    question: "What is the correct way to declare a pointer in C++?",
    choice1: "int *ptr;",
    choice2: "ptr int;",
    choice3: "pointer int ptr;",
    choice4: "int pointer ptr;",
    answer: 1
  },
  {
    question: "What is the purpose of the const keyword in C++?",
    choice1: "It declares a variable constant",
    choice2: "It creates a constant function",
    choice3: "It defines a constant class",
    choice4: "It denotes a constant loop",
    answer: 1
  },
  {
    question: "Which of the following is used to dynamically allocate memory in C++?",
    choice1: "new",
    choice2: "malloc",
    choice3: "allocate",
    choice4: "memalloc",
    answer: 1
  },
  {
    question: "What is encapsulation in C++?",
    choice1: "It is a mechanism to hide the implementation details and expose only the necessary functionalities",
    choice2: "It is a feature to allow multiple inheritance",
    choice3: "It is a way to declare variables within a class",
    choice4: "It is a process of converting objects into primitive data types",
    answer: 1
  },
  {
    question: "What is the purpose of the virtual keyword in C++",
    choice1: "It is used to define a constant variable",
    choice2: "It indicates that a function may be overridden in derived classes",
    choice3: "It declares a variable to be global",
    choice4: "It creates a virtual machine for executing C++ code",
    answer: 2
  },
  {
    question: "What is a constructor in C++?",
    choice1: "A function used to destroy objects",
    choice2: "A special member function that initializes object",
    choice3: "A keyword used to define derived classes",
    choice4: "A method to access private members of a class",
    answer: 2
  },
  {
    question: "What is the concept of polymorphism in C++?",
    choice1: "It is a way to declare multiple variables with the same name",
    choice2: "It allows a class to inherit from multiple base classes",
    choice3: "It enables objects of different classes to be treated as objects of a common base class",
    choice4: "It is a mechanism to hide the details of a class",
    answer: 3
  },

];

//CONSTANTS
const CORRECT_BONUS = 5;
const MAX_QUESTIONS = 20;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
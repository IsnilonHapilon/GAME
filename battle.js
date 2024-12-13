let playerHP = 100;
let opponentHP = 100;
let difficulty = sessionStorage.getItem("difficulty");  
let currentQuestion = 0;

const questions = {
    easy: [
        { question: "What is C++?", answers: ["A language", "A tool", "A framework", "An OS"], correct: 0 },
        { question: "Which symbol is used for comments in C++?", answers: ["#", "//", "/* */", "@@"], correct: 1 },
        { question: "What is a compiler?", answers: ["Translator", "Debugger", "Editor", "Styler"], correct: 0 },
        { question: "What is the extension for a C++ file?", answers: [".cpp", ".java", ".py", ".cxx"], correct: 0 },
        { question: "Which function is used to print in C++?", answers: ["cout", "print", "printf", "out"], correct: 0 },
        { question: "What is a variable?", answers: ["A constant value", "A placeholder for data", "A pointer", "None of these"], correct: 1 },
        { question: "What is the output of `5 % 2`?", answers: ["0", "1", "2", "3"], correct: 1 },
        { question: "Which library is used for input and output in C++?", answers: ["<iostream>", "<math>", "<string>", "<fstream>"], correct: 0 },
        { question: "Which loop runs until a condition is false?", answers: ["for", "while", "do-while", "All of these"], correct: 3 },
        { question: "What does 'int' stand for in C++?", answers: ["Integer", "Interval", "Internal", "Intrinsic"], correct: 0 },
        { question: "Which operator is used to compare two values?", answers: ["=", "==", ">", "<"], correct: 1 },
        { question: "What is the starting index of an array in C++?", answers: ["0", "1", "-1", "It varies"], correct: 0 },
        { question: "Which keyword is used to create a function in C++?", answers: ["func", "method", "void", "None of these"], correct: 3 },
        { question: "Which function is used to read input in C++?", answers: ["cin", "scanf", "input", "read"], correct: 0 },
        { question: "Which symbol is used to end a statement in C++?", answers: [".", ";", ":", "!"], correct: 1 }
    ],
    medium: [
        { question: "What is a binary tree?", answers: ["A type of data structure", "A type of plant", "An algorithm", "A sort method"], correct: 0 },
        { question: "What is the time complexity of binary search?", answers: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], correct: 1 },
        { question: "What is a stack?", answers: ["LIFO", "FIFO", "Sorted list", "Tree"], correct: 0 },
        { question: "Which data structure uses FIFO?", answers: ["Stack", "Queue", "Tree", "Array"], correct: 1 },
        { question: "What is the maximum number of children a binary tree node can have?", answers: ["1", "2", "3", "4"], correct: 1 },
        { question: "What does DFS stand for?", answers: ["Data File Structure", "Depth First Search", "Data First Search", "Direct File System"], correct: 1 },
        { question: "What is a hash table?", answers: ["A tree", "A mapping structure", "A sorting algorithm", "None of these"], correct: 1 },
        { question: "What is the time complexity of bubble sort?", answers: ["O(n)", "O(n^2)", "O(log n)", "O(1)"], correct: 1 },
        { question: "Which sorting algorithm is fastest for small datasets?", answers: ["Bubble sort", "Quick sort", "Merge sort", "Insertion sort"], correct: 3 },
        { question: "What is the use of a pointer?", answers: ["To store a value", "To store an address", "To link files", "None of these"], correct: 1 },
        { question: "What is an adjacency list used for?", answers: ["Trees", "Graphs", "Stacks", "Arrays"], correct: 1 },
        { question: "Which data structure is used in recursion?", answers: ["Queue", "Stack", "Heap", "Tree"], correct: 1 },
        { question: "What is the best-case time complexity of quick sort?", answers: ["O(n)", "O(n^2)", "O(n log n)", "O(log n)"], correct: 2 },
        { question: "What is a graph?", answers: ["A tree", "A matrix", "A network of nodes and edges", "None of these"], correct: 2 },
        { question: "Which data structure is used for breadth-first search?", answers: ["Stack", "Queue", "Array", "Tree"], correct: 1 }
    ],
    hard: [
        { question: "What is encapsulation?", answers: ["Data hiding", "Data visibility", "Data linking", "Data abstraction"], correct: 0 },
        { question: "What is polymorphism?", answers: ["Single form", "Many forms", "Inheritance", "Encapsulation"], correct: 1 },
        { question: "What is inheritance?", answers: ["Reusing code", "Hiding data", "Many forms", "Linking objects"], correct: 0 },
        { question: "What is a constructor?", answers: ["Special function", "Destructor", "Initializer", "Overloaded operator"], correct: 0 },
        { question: "What does 'virtual' mean in C++?", answers: ["Overloading", "Overriding", "Dynamic binding", "Static binding"], correct: 2 },
        { question: "What is abstraction?", answers: ["Hiding implementation", "Hiding data", "Hiding logic", "None of these"], correct: 0 },
        { question: "Which keyword is used for inheritance in C++?", answers: ["extends", "inherits", "public", "protected"], correct: 2 },
        { question: "Which operator is used to access a class member?", answers: [".", "->", "::", "All of these"], correct: 3 },
        { question: "What is a destructor?", answers: ["Destroys an object", "Initializes an object", "Links objects", "Hides data"], correct: 0 },
        { question: "Which function is used to copy objects?", answers: ["Copy constructor", "Assignment operator", "Destructor", "None of these"], correct: 0 },
        { question: "What is the output of `new` in C++?", answers: ["A reference", "A pointer", "A value", "A variable"], correct: 1 },
        { question: "What does 'static' mean in C++?", answers: ["Shared among objects", "Hides data", "Initializes data", "None of these"], correct: 0 },
        { question: "What is an abstract class?", answers: ["Class without implementation", "Class with only public methods", "Class with private variables", "None of these"], correct: 0 },
        { question: "Which keyword is used to define an interface?", answers: ["interface", "abstract", "virtual", "None of these"], correct: 3 },
        { question: "What does 'this' represent in C++?", answers: ["Current object", "Parent class", "Global scope", "None of these"], correct: 0 }
    ]
};

let selectedQuestions = [];

 
function loadQuestions() {
    selectedQuestions = [...questions[difficulty]];
    selectedQuestions.sort(() => Math.random() - 0.5);  
}

 
function loadQuestion() {
    let question = selectedQuestions[currentQuestion];
    document.getElementById("question").textContent = question.question;
    document.getElementById("choiceA").textContent = question.answers[0];
    document.getElementById("choiceB").textContent = question.answers[1];
    document.getElementById("choiceC").textContent = question.answers[2];
    document.getElementById("choiceD").textContent = question.answers[3];
}

 
function handleAnswer(choice) {
    let question = selectedQuestions[currentQuestion];

     
    if (choice === question.correct) {
        opponentHP -= 15;
        animateAttack("player", "opponent");
        displayResult("Correct! Opponent takes 15 damage.", true);
    } else {
        
        highlightCorrectAnswer(question.correct);

        let damage = difficulty === "easy" ? 15 : difficulty === "medium" ? 20 : 25;
        playerHP -= damage;
        
         
        setTimeout(() => {
            animateAttack("opponent", "player");
            displayResult(`Wrong! You take ${damage} damage.`, false);
        }, 1500); 
    }

     
    currentQuestion++;
    setTimeout(() => {
        if (opponentHP <= 0 || playerHP <= 0) {
            endGame();
        } else if (currentQuestion < selectedQuestions.length) {
            loadQuestion();
        } else {
            endGame();
        }
        updateHP();
    }, 3000);  
}

function highlightCorrectAnswer(correctIndex) {
    
    const buttons = [
        document.getElementById("choiceA"),
        document.getElementById("choiceB"),
        document.getElementById("choiceC"),
        document.getElementById("choiceD")
    ];

    const correctButton = buttons[correctIndex];

     
    correctButton.classList.add("highlight");

    
    setTimeout(() => {
        correctButton.classList.remove("highlight");
    }, 1500);
}

 
const style = document.createElement("style");
style.textContent = `
    .highlight {
        animation: highlightEffect 1.5s ease;
    }

    @keyframes highlightEffect {
        0% { background-color: yellow; }
        50% { background-color: orange; }
        100% { background-color: yellow; }
    }
`;
document.head.appendChild(style);


function updateHP() {
    document.getElementById("player-hp").textContent = playerHP;
    document.getElementById("opponent-hp").textContent = opponentHP;
    document.getElementById("player-health-fill").style.width = `${Math.max(0, playerHP)}%`;
    document.getElementById("opponent-health-fill").style.width = `${Math.max(0, opponentHP)}%`;
}

function animateAttack(attacker, target) {
    let blackout = document.createElement("div");
    blackout.id = "blackout";
    blackout.style.position = "absolute";
    blackout.style.width = "100%";
    blackout.style.height = "100%";
    blackout.style.backgroundColor = "rgba(0, 0, 0, 0.5)";  
    blackout.style.top = "0";
    blackout.style.left = "0";
    blackout.style.zIndex = "5";
    document.body.appendChild(blackout);

    let spark = document.createElement("img");
    spark.src = "spark.gif";
    spark.className = "attack-spark";
    spark.style.position = "absolute";
    spark.style.zIndex = "6";  
    document.body.appendChild(spark);

    let attackerSprite = document.getElementById(attacker + "-sprite");
    let targetSprite = document.getElementById(target + "-sprite");

    let attackerRect = attackerSprite.getBoundingClientRect();
    let targetRect = targetSprite.getBoundingClientRect();

     
    spark.style.left = `${attackerRect.left + attackerRect.width / 2}px`;
    spark.style.top = `${attackerRect.top + attackerRect.height / 2}px`;

    setTimeout(() => {
        spark.style.transition = "all 1s ease";  
        spark.style.left = `${targetRect.left + targetRect.width / 2}px`;
        spark.style.top = `${targetRect.top + targetRect.height / 2}px`;
    }, 800);  

    
    let targetElement = document.getElementById(target + "-sprite");
    targetElement.classList.add("flash-red");

    
    targetElement.classList.add("shake");

    setTimeout(() => {
        targetElement.classList.remove("shake");   
    }, 500);   

     
    attackerSprite.classList.add("recoil");
    targetSprite.classList.add("recoil");

    setTimeout(() => {
        attackerSprite.classList.remove("recoil");  
        targetSprite.classList.remove("recoil");  
    }, 1000);   

    setTimeout(() => {
        if (opponentHP <= 0 && target === "opponent") {
             
            let fireEffect = document.querySelector(".fire-effect");
            if (fireEffect) {
                fireEffect.remove();
            }

           
            document.getElementById("player-sprite").style.display = "none";
            document.getElementById("opponent-sprite").style.display = "none";

            
            let victoryContainer = document.createElement("div");
            victoryContainer.id = "victoryContainer";
            victoryContainer.style.position = "absolute";
            victoryContainer.style.top = "10%";
            victoryContainer.style.left = "50%";
            victoryContainer.style.transform = "translateX(-50%)";
            victoryContainer.style.textAlign = "center"; 
            victoryContainer.style.zIndex = "10"; 
            document.body.appendChild(victoryContainer);

            let victoryMessage = document.createElement("div");
            victoryMessage.id = "victoryMessage";
            victoryMessage.style.fontSize = "40px";
            victoryMessage.style.color = "green";
            victoryMessage.innerHTML = "Victory!";
            victoryContainer.appendChild(victoryMessage);

            let playerImage = document.createElement("img");
            playerImage.src = "player.png";
            playerImage.style.width = "160px";   
            victoryContainer.appendChild(playerImage);
        }
    }, 1500);  

    setTimeout(() => {
        spark.remove();
        blackout.remove();
    }, 1600);  
}



function displayResult(result, isCorrect) {
     
    let existingResult = document.getElementById("result-display");
    if (existingResult) existingResult.remove();

     
    let resultDisplay = document.createElement("div");
    resultDisplay.id = "result-display";
    resultDisplay.textContent = result;
    resultDisplay.style.position = "absolute";
    resultDisplay.style.fontSize = "1.5rem";
    resultDisplay.style.color = "white";
    resultDisplay.style.zIndex = "7";  

    if (isCorrect) {
        
        let playerSprite = document.getElementById("player-sprite");
        let playerRect = playerSprite.getBoundingClientRect();
        resultDisplay.style.left = `${playerRect.right + 10}px`;
        resultDisplay.style.top = `${playerRect.top + playerRect.height / 2 - 20}px`;
    } else {
         
        let opponentSprite = document.getElementById("opponent-sprite");
        let opponentRect = opponentSprite.getBoundingClientRect();
        resultDisplay.style.left = `${opponentRect.left - 150}px`;
        resultDisplay.style.top = `${opponentRect.top + opponentRect.height / 2 - 20}px`;
    }

    document.body.appendChild(resultDisplay);

     
    setTimeout(() => {
        resultDisplay.remove();
    }, 1500);
}

function endGame() {
    let resultMessage = playerHP <= 0 ? "DEFEAT! MAG-ARAL ka pa kaibigan!" : "WOW palong-palo yarn?!";
    let resultImage = playerHP <= 0 ? "defeat.gif" : "victory.gif";

    document.getElementById("battle-container").classList.add("blurred");

    let resultContainer = document.createElement("div");
    resultContainer.id = "result-overlay";
    resultContainer.innerHTML = `
        <img src="${resultImage}" alt="${resultMessage}" id="result-image">
        <p id="result-text">${resultMessage}</p>
    `;

    let retryButton = document.createElement("button");
    retryButton.textContent = "Retry";
    retryButton.className = "pixel-button";
    retryButton.addEventListener("click", () => {
        playerHP = 100;
        opponentHP = 100;
        currentQuestion = 0;
        loadQuestions();
        loadQuestion();
        updateHP();

        document.getElementById("battle-container").classList.remove("blurred");
        resultContainer.remove();
    });

    let exitButton = document.createElement("button");
    exitButton.textContent = "Exit";
    exitButton.className = "pixel-button";
    exitButton.addEventListener("click", () => {
        window.location.href = "result.html";
    });

    resultContainer.appendChild(retryButton);
    resultContainer.appendChild(exitButton);
    document.body.appendChild(resultContainer);
}

 
loadQuestions();
loadQuestion();
updateHP();

document.getElementById("choiceA").addEventListener("click", () => handleAnswer(0));
document.getElementById("choiceB").addEventListener("click", () => handleAnswer(1));
document.getElementById("choiceC").addEventListener("click", () => handleAnswer(2));
document.getElementById("choiceD").addEventListener("click", () => handleAnswer(3));
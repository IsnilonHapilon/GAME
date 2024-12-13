document.addEventListener("DOMContentLoaded", function () {
      const cards = [
          {
              question: `C#: Debug the code:
    public class Program {
        static void Main(string[] args) {
            Console.______("Hello World");
        }
    }`,
              answer: "WriteLine"
          },
          {
              question: `C++: Debug the code:
    #include <iostream>
    using namespace std;
    int main() {
        cout << "Hello, World" << ____;
        return 0;
    }`,
              answer: "endl"
          },
          {
              question: `Java: Debug the code:
    public class Main {
        public static void main(String[] args) {
            System.out.______("Hello, World");
        }
    }`,
              answer: "println"
          },
          {
              question: `C#: Debug the code:
    class MyClass {
        ______ void myMethod() {
            // method logic here
        }
    }`,
              answer: "public"
          },
          {
              question: `C++: Debug the code:
    class MyClass {
        ______ void myMethod() {
            // method logic here
        }
    }`,
              answer: "public"
          },
          {
              question: `Java: Debug the code:
    public class MyClass {
        ______ void myMethod() {
            // method logic here
        }
    }`,
              answer: "public"
          },
          {
              question: `C#: Debug the code:
    if (x > 10) {
        Console.WriteLine("x is greater than 10");
    } ______ {
        Console.WriteLine("x is 10 or less");
    }`,
              answer: "else"
          },
          {
              question: `C++: Debug the code:
    if (x > 10) {
        cout << "x is greater than 10";
    } ______ {
        cout << "x is 10 or less";
    }`,
              answer: "else"
          },
          {
              question: `Java: Debug the code:
    if (x > 10) {
        System.out.println("x is greater than 10");
    } ______ {
        System.out.println("x is 10 or less");
    }`,
              answer: "else"
          },
          {
              question: `C#: Debug the code:
    int x = 5;
    int result = x ______ 2;  // Calculate the remainder
    Console.WriteLine(result);`,
              answer: "%"
          },
          {
              question: `C++: Debug the code:
    int x = 5;
    int result = x ______ 2;  // Calculate the remainder
    cout << result;`,
              answer: "%"
          },
          {
              question: `Java: Debug the code:
    int x = 5;
    int result = x ______ 2;  // Calculate the remainder
    System.out.println(result);`,
              answer: "%"
          }
      ];
  
      const cardContainer = document.getElementById("card-container");
      const questionContainer = document.createElement("div");
      questionContainer.classList.add("question-container");
      document.body.appendChild(questionContainer);
      questionContainer.style.display = "none";
  
      const answerSection = document.getElementById("answer-section");
      const answerInput = document.getElementById("answer-input");
      const confirmButton = document.getElementById("confirm-button");
  
      const returnButton = document.createElement("button");
      returnButton.textContent = "Return";
      returnButton.classList.add("button");
      returnButton.id = "return-button";
      questionContainer.appendChild(returnButton);
  
      const selectCardText = document.getElementById("question-box");
      let activeCardIndex = -1;
      let userAnswers = [];
      let score = 0;
  
      const progressBarContainer = document.createElement("div");
      progressBarContainer.classList.add("progress-bar-container");
      document.body.appendChild(progressBarContainer);
  
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBarContainer.appendChild(progressBar);
  
      const levelText = document.createElement("div");
      levelText.classList.add("level-text");
      document.body.appendChild(levelText);
  
      function updateProgressBar() {
          progressBar.style.width = `${(score / 30) * 100}%`;
          if (score >= 1 && score <= 10) {
              levelText.textContent = "Level: Newbie";
          } else if (score >= 11 && score <= 20) {
              levelText.textContent = "Level: Coder";
          } else if (score >= 21 && score <= 30) {
              levelText.textContent = "Level: Tech Bro";
          }
      }
  
      function initializeCards() {
          cardContainer.innerHTML = "";
          cards.forEach((_, index) => {
              const card = document.createElement("div");
              card.classList.add("card");
              card.id = `card-${index}`;
              card.textContent = "?";
              card.addEventListener("click", () => revealQuestion(index));
              cardContainer.appendChild(card);
          });
      }
  
      function revealQuestion(index) {
          activeCardIndex = index;
          const card = cards[index];
          questionContainer.innerHTML = `<pre>${card.question}</pre>`;
          questionContainer.appendChild(returnButton);
          questionContainer.style.display = "block";
          cardContainer.style.display = "none";
          selectCardText.style.display = "none";
          answerSection.style.display = "block";
          document.getElementById("skip-button").style.display = "block";
      }
  
      function returnToCards() {
          questionContainer.style.display = "none";
          cardContainer.style.display = "grid";
          selectCardText.style.display = "block";
          answerSection.style.display = "none";
          document.getElementById("skip-button").style.display = "none";
      }
  
      function checkAnswer() {
          if (activeCardIndex === -1) return;
          const userAnswer = answerInput.value.trim();
          const correctAnswer = cards[activeCardIndex].answer;
  
          if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
              score += 3;
          }
  
          userAnswers.push({
              question: cards[activeCardIndex].question,
              userAnswer: userAnswer,
              correctAnswer: correctAnswer
          });
  
          const card = document.getElementById(`card-${activeCardIndex}`);
          card.remove();
          answerInput.value = '';
          activeCardIndex = -1;
          updateProgressBar();
  
          if (document.querySelectorAll(".card").length === 0) {
              showSummary();
          } else {
              returnToCards();
          }
      }
  
      function showSummary() {
          cardContainer.style.display = "none";
          questionContainer.style.display = "none";
          answerSection.style.display = "none";
  
          const summaryContainer = document.createElement("div");
          summaryContainer.classList.add("summary-container");
          document.body.appendChild(summaryContainer);
          summaryContainer.innerHTML = "<h2>Game Over! Here's your summary:</h2>";
  
          const scrollableSummary = document.createElement("div");
          scrollableSummary.classList.add("scrollable-summary");
          summaryContainer.appendChild(scrollableSummary);
  
          userAnswers.forEach(answer => {
              const questionDiv = document.createElement("div");
              questionDiv.classList.add("summary-question");
              questionDiv.innerHTML = `<strong>Question:</strong><pre>${answer.question}</pre>`;
  
              const answerDiv = document.createElement("div");
              answerDiv.classList.add("summary-answer");
  
              if (answer.userAnswer.toLowerCase() !== answer.correctAnswer.toLowerCase()) {
                  answerDiv.innerHTML = `<span style="color: red;"><strong>Your Answer:</strong> ${answer.userAnswer} <br><strong>Correct Answer:</strong> ${answer.correctAnswer}</span>`;
              } else {
                  answerDiv.innerHTML = `<span style="color: green;"><strong>Your Answer:</strong> ${answer.userAnswer} <br><strong>Correct Answer:</strong> ${answer.correctAnswer}</span>`;
              }
  
              scrollableSummary.appendChild(questionDiv);
              scrollableSummary.appendChild(answerDiv);
          });
  
          const buttonContainer = document.createElement("div");
          buttonContainer.classList.add("button-container");
          summaryContainer.appendChild(buttonContainer);
  
          const retryButton = document.createElement("button");
          retryButton.textContent = "Retry";
          retryButton.style.cssText = `
              background: #1d4f7e;
              border: 10px solid #272727;
              color: rgb(213, 242, 243);
              font-family: 'Press Start 2P', cursive;
              font-size: 24px;
              font-weight: bold;
              text-transform: uppercase;
              cursor: pointer;
              padding: 30px 50px;
              margin: 15px;
              box-shadow: 0 25px 0 #121724;
              border-radius: 25px;
              text-align: center;
              text-shadow: 
                  1px 1px 0 #000,
                  2px 2px 0 #222,
                  3px 3px 0 #3f4149,
                  4px 4px 0 #504c66;
          `;
          retryButton.addEventListener("click", () => {
              userAnswers = [];
              score = 0;
              shuffleArray(cards);
              updateProgressBar();
              summaryContainer.remove();
              initializeCards();
              cardContainer.style.display = "grid";
              selectCardText.style.display = "block";
          });
  
          const nextGameButton = document.createElement("button");
          nextGameButton.textContent = "Next Game";
          nextGameButton.style.cssText = retryButton.style.cssText;
          nextGameButton.addEventListener("click", () => {
              window.location.href = "brain.html";
          });
  
          const exitButton = document.createElement("button");
          exitButton.textContent = "Exit";
          exitButton.style.cssText = retryButton.style.cssText;
          exitButton.addEventListener("click", () => {
              window.location.href = "homepage.html";
          });
  
          buttonContainer.appendChild(retryButton);
          buttonContainer.appendChild(nextGameButton);
          buttonContainer.appendChild(exitButton);
      }
  
      function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
      }
  
      const skipButton = document.getElementById("skip-button");

      // Initially disable confirm button
      confirmButton.disabled = true;

      // Add input event listener to enable/disable confirm button
      answerInput.addEventListener("input", function() {
          confirmButton.disabled = !this.value.trim();
      });

      // Hide skip button initially since cards are showing
      skipButton.style.display = "none";

      confirmButton.addEventListener("click", checkAnswer);
      returnButton.addEventListener("click", returnToCards);
      
      skipButton.addEventListener("click", function() {
          const currentQuestion = document.querySelector(".question-container");
          if (currentQuestion) {
              const input = document.querySelector("#answer-input");
              input.value = ""; // Clear the input
              checkAnswer(); // Process the empty answer
          }
      });
      
      initializeCards();
  });
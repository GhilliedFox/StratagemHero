import { stratagemSequences } from "./stratagems.js";

let currentSequence = [];
let displayedStratagems = [];
let timerDuration = 10; // 10 seconds for the timer to start
let timerStarted = false;
let timerInterval;

// Initialize or reset timer
function initializeTimer() {
  clearInterval(timerInterval);
  updateTimerProgress(100); // Reset progress to 100%
  timerDuration = 10; // Reset timer to 10 seconds
}

// Start timer
function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    timerStarted = true;
    timerInterval = setInterval(() => {
      timerDuration -= 0.1; // Decrease timer
      let progressPercentage = (timerDuration / 10) * 100;
      updateTimerProgress(progressPercentage);

      if (timerDuration <= 0) {
        clearInterval(timerInterval);
        console.log("Time's up!");
        // Handle game over or time up scenario
      }
    }, 100); // Update every 100 milliseconds for smoother countdown
  }
}

// Reset timer
function resetTimer() {
  timerStarted = false;
  timerDuration = 10; // Reset timer to 10 seconds
  updateTimerProgress(100); // Reset progress to 100%
  clearInterval(timerInterval);
}

// Update timer progress bar
function updateTimerProgress(progressPercentage) {
  const progressBar = document.getElementById("timer-progress");
  progressBar.style.width = `${progressPercentage}%`;
}

document.addEventListener("keydown", function (event) {
  const key = keyMap[event.keyCode] || event.keyCode;
  if (![37, 38, 39, 40].includes(key)) return;

  if (!timerStarted) startTimer(); // Start the timer on the first keypress

  currentSequence.push(key);
  checkSequence();
});

function checkSequence() {
  if (!timerStarted) startTimer(); // Start the timer on the first keypress

  let isCorrectSoFar = true;
  if (displayedStratagems.length > 0) {
    const expectedSequence = displayedStratagems[0].sequence;
    for (let i = 0; i < currentSequence.length; i++) {
      if (currentSequence[i] !== expectedSequence[i]) {
        isCorrectSoFar = false;
        highlightArrow(i, false); // Incorrect - show red
        currentSequence = []; // Reset the sequence due to error
        // Reset visual feedback for all arrows
        setTimeout(() => {
          const sequenceDiv = document.getElementById("sequence");
          Array.from(
            sequenceDiv.getElementsByClassName("arrow-container")
          ).forEach((container) => (container.style.border = ""));
        }, 250);
        break; // Exit loop on first incorrect key press
      } else {
        highlightArrow(i, true); // Correct so far - show yellow
      }
    }

    // Check if the full sequence was correct
    if (isCorrectSoFar && currentSequence.length === expectedSequence.length) {
      console.log(`${displayedStratagems[0].name} activated!`);
      // Remove the matched stratagem from the list
      displayedStratagems.splice(0, 1);
      currentSequence = []; // Reset the current sequence for the next stratagem
      // Add time for completing the sequence correctly
      timerDuration = Math.min(timerDuration + 1, 10); // Ensure the timer doesn't exceed 10 seconds

      if (displayedStratagems.length === 0) {
        console.log("All stratagems activated! Loading more...");
        startGame(); // Reload or repopulate stratagems if all are matched
        resetTimer(); // Reset the timer after completing all stratagems
      } else {
        // Update the displayed list with remaining stratagems
        displayStratagems(displayedStratagems);
      }
    }
  }

  if (currentSequence.length > 8) {
    currentSequence.shift(); // Limit the sequence length to 8
  }
}

function highlightArrow(index, correct) {
  const sequenceDiv = document.getElementById("sequence");
  const arrowContainers = sequenceDiv.getElementsByClassName("arrow-container");
  if (index < arrowContainers.length) {
    const arrowContainer = arrowContainers[index];
    if (correct) {
      // If correct, apply a yellow border
      arrowContainer.style.border = "2px solid yellow";
    } else {
      // If incorrect, flash a red border
      arrowContainer.style.border = "2px solid red";
      setTimeout(() => {
        arrowContainer.style.border = ""; // Revert to default or neutral border style
      }, 250);
    }
  }
}

// keymap to map WASD to arrow keys
const keyMap = {
  87: 38, // W -> Up
  65: 37, // A -> Left
  83: 40, // S -> Down
  68: 39, // D -> Right
};

function getRandomStratagems() {
  const randomStratagems = [];
  // Select 10 stratagems
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * stratagemSequences.length);
    randomStratagems.push(stratagemSequences[randomIndex]);
  }
  return randomStratagems;
}

function displayStratagems(stratagems) {
  const iconDiv = document.getElementById("stratagem-icon");
  const nameDiv = document.getElementById("stratagem-name"); // Get the div for displaying the stratagem name
  const sequenceDiv = document.getElementById("sequence");

  iconDiv.innerHTML = ""; // Clear existing content
  sequenceDiv.innerHTML = ""; // Clear previous sequences
  nameDiv.innerHTML = ""; // Clear previous name

  stratagems.forEach((stratagem, index) => {
    const stratagemElement = document.createElement("div");
    stratagemElement.style.margin = "10px";

    const imageElement = document.createElement("img");
    imageElement.src = stratagem.imageUrl;
    imageElement.alt = stratagem.name;

    if (index === 0) {
      imageElement.style.border = "3px solid yellow";
      // Display the name of the active stratagem
      nameDiv.textContent = stratagem.name; // Set the text of the name div to the current stratagem's name

      // Display sequence for the first stratagem
      stratagem.sequence.forEach((code, sequenceIndex) => {
        const arrowContainer = document.createElement("div");
        arrowContainer.className = "arrow-container";
        arrowContainer.setAttribute("data-sequence-index", sequenceIndex);
        const arrowImage = codeToArrow(code);
        arrowContainer.appendChild(arrowImage);
        sequenceDiv.appendChild(arrowContainer);
      });
    } else {
      imageElement.style.border = "none"; // Ensure others don't have it, or set to a default
    }

    stratagemElement.appendChild(imageElement);
    iconDiv.appendChild(stratagemElement);
  });
}

function codeToArrow(code) {
  const img = document.createElement("img");
  img.setAttribute("data-arrow", code); // Set data-arrow attribute
  switch (code) {
    case 37:
      img.src = "images/arrows/L - Copy.png";
      break;
    case 38:
      img.src = "images/arrows/U - Copy.png";
      break;
    case 39:
      img.src = "images/arrows/R - Copy.png";
      break;
    case 40:
      img.src = "images/arrows/D - Copy.png";
      break;
    default:
      img.alt = "Unmapped Key";
      break;
  }
  return img;
}

// SIDEBAR
document.addEventListener("DOMContentLoaded", () => {
  const stratagemsContainer = document.getElementById("stratagems-container");

  stratagemSequences.forEach((stratagem) => {
    // Create a container for each stratagem
    const stratagemElement = document.createElement("div");
    stratagemElement.classList.add("stratagem");

    // Create an image element for the stratagem
    const imageElement = document.createElement("img");
    imageElement.src = stratagem.imageUrl;
    imageElement.alt = stratagem.name;
    imageElement.style.width = "100%";
    stratagemElement.appendChild(imageElement);

    // Append the stratagem element to the container
    stratagemsContainer.appendChild(stratagemElement);
  });
});

// game start logic
function startGame() {
  displayedStratagems = getRandomStratagems();
  displayStratagems(displayedStratagems);
  resetTimer();
}

window.onload = function () {
  startGame();
};

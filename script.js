import { stratagemSequences } from "./stratagems.js";

let currentSequence = [];
let displayedStratagems = [];
let timerDuration = 10; // 10 seconds for the timer to start
let timerStarted = false;
let timerInterval;

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
        // TODO: Handle game over or time up scenario
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
  startTimer(); // Restart the timer
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

function updateGameDisplay() {
  const activeStratagems = getActiveStratagems();
  if (activeStratagems.length > 0) {
    // Choose stratagems for display based on selection
    displayedStratagems = getRandomSelectedStratagems(activeStratagems);
    displayStratagems(displayedStratagems);
  } else {
    clearGameDisplay(); // function to clear the game area or display a default message
  }
}

// Clear the game display area or show a default message
function clearGameDisplay() {
  const iconDiv = document.getElementById("stratagem-icon");
  const nameDiv = document.getElementById("stratagem-name"); // If you use it
  const sequenceDiv = document.getElementById("sequence");

  // Clear the game display area
  iconDiv.innerHTML = "";
  nameDiv.innerHTML = "Select stratagems to start";
  sequenceDiv.innerHTML = "";
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

  const toggleAllContainer = document.createElement("div");
  toggleAllContainer.classList.add("toggle-all-container");
  const toggleAllCheckbox = document.createElement("input");
  toggleAllCheckbox.type = "checkbox";
  toggleAllCheckbox.id = "toggle-all";
  toggleAllCheckbox.checked = true;
  const toggleAllLabel = document.createElement("label");
  toggleAllLabel.htmlFor = "toggle-all";
  toggleAllLabel.textContent = "Toggle All";
  toggleAllContainer.appendChild(toggleAllCheckbox);
  toggleAllContainer.appendChild(toggleAllLabel);
  stratagemsContainer.appendChild(toggleAllContainer);
  stratagemsContainer.appendChild(document.createElement("br"));

  toggleAllCheckbox.addEventListener("change", () => {
    document
      .querySelectorAll(
        "#stratagems-container .stratagem input[type='checkbox']"
      )
      .forEach((checkbox, index) => {
        checkbox.checked = toggleAllCheckbox.checked;
        document
          .querySelectorAll("#stratagems-container .stratagem .image-container")
          [index].classList.toggle("active", toggleAllCheckbox.checked);
      });
    updateGameDisplay();
  });

  const stratagemsByCategory = groupStratagemsByCategory(stratagemSequences);
  Object.entries(stratagemsByCategory).forEach(([category, stratagems]) => {
    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category;
    stratagemsContainer.appendChild(categoryTitle);
    stratagemsContainer.appendChild(document.createElement("br"));

    stratagems.forEach((stratagem) => {
      const stratagemElement = document.createElement("div");
      stratagemElement.classList.add("stratagem");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `stratagem-${stratagem.id}`;
      checkbox.checked = true;
      checkbox.dataset.stratagemId = stratagem.id;
      checkbox.classList.add("visually-hidden");

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container", "clickable", "active");
      const imageElement = document.createElement("img");
      imageElement.src = stratagem.imageUrl;
      imageElement.alt = stratagem.name;
      imageContainer.appendChild(imageElement);

      imageContainer.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked;
        imageContainer.classList.toggle("active");
        updateGameDisplay();
      });

      stratagemElement.appendChild(checkbox);
      stratagemElement.appendChild(imageContainer);
      stratagemsContainer.appendChild(stratagemElement);
    });
    // spacing element after the last stratagem of each category
    stratagemsContainer.appendChild(document.createElement("br"));
  });
});

function groupStratagemsByCategory(stratagems) {
  return stratagems.reduce((acc, stratagem) => {
    (acc[stratagem.category] = acc[stratagem.category] || []).push(stratagem);
    return acc;
  }, {});
}

function getActiveStratagems() {
  const activeStratagems = [];
  const checkboxes = document.querySelectorAll(
    '#stratagems-container .stratagem input[type="checkbox"]:checked'
  );

  checkboxes.forEach((checkbox) => {
    const stratagemId = checkbox.dataset.stratagemId;
    const stratagem = stratagemSequences.find(
      (s) => s.id.toString() === stratagemId
    );
    if (stratagem) {
      activeStratagems.push(stratagem);
    }
  });
  return activeStratagems;
}

function getRandomSelectedStratagems(activeStratagems) {
  const randomStratagems = [];
  for (let i = 0; i < 6; i++) {
    if (activeStratagems.length === 0) {
      console.error("No stratagems selected");
      return [];
    }
    const randomIndex = Math.floor(Math.random() * activeStratagems.length);
    randomStratagems.push(activeStratagems[randomIndex]);
  }
  return randomStratagems;
}

function startGame() {
  const activeStratagems = getActiveStratagems();
  if (activeStratagems.length > 0) {
    displayedStratagems = getRandomSelectedStratagems(activeStratagems);
    displayStratagems(displayedStratagems);
  } else {
    alert("Please select at least one stratagem to start the game.");
  }
}

window.onload = function () {
  startGame();
};

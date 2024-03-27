import { stratagemSequences } from "./stratagems.js";

// event listener for key presses
document.addEventListener("keydown", function (event) {
  // Map WASD to arrow keys; ignore other keys
  const key = keyMap[event.keyCode] || event.keyCode;
  if (![37, 38, 39, 40].includes(key)) return;

  // Add the mapped key to the current sequence
  currentSequence.push(key);

  // Process the current sequence
  checkSequence();
});

// Initialize an array to store the keys pressed in the current sequence
let currentSequence = [];

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

      if (displayedStratagems.length === 0) {
        console.log("All stratagems activated! Loading more...");
        startGame(); // Reload or repopulate stratagems if all are matched
      } else {
        // Update the displayed list with remaining stratagems
        displayStratagems(displayedStratagems);
      }
    }
  }

  if (currentSequence.length > 8) {
    // Limit the sequence length to 8
    currentSequence.shift();
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

let displayedStratagems = [];

function startGame() {
  displayedStratagems = getRandomStratagems();
  displayStratagems(displayedStratagems);
}

window.onload = function () {
  startGame();
};

let timeRemaining = 300; // Timer starts at 300 seconds
let score = 0; // Initial score
let hintCount = 0;
const maxHints = 4;
let correctSuspect = Math.floor(Math.random() * 8); // Randomly choose the culprit from 8 suspects
let currentClueIndex = 0;

// Backstory for the game
const backstory = `
The annual Pizza Fest is the most celebrated event in the city, drawing food lovers from every corner. This year, Pepperoni Palace was set to unveil their secret recipe, featuring their prized imported pepperoni. The restaurant was abuzz with excitement until disaster struck—hours before the event, the pepperoni went missing.

Eight individuals—staff and frequent patrons—are now under suspicion. Each has a motive, and the clock is ticking. As the restaurant's trusted investigator, you must solve this culinary mystery before the festival begins and the reputation of Pepperoni Palace crumbles forever. Will you expose the thief or let them walk away with the spicy prize?
`;

// Display backstory
document.getElementById("story").textContent = backstory;

// Suspects (8 suspects with backstories and clues)
const suspects = [
  {
    name: "Chef Q",
    backstory: "The head chef who has been feeling underappreciated lately. Known for his fiery temper and perfectionism, Q has hinted at 'teaching the owners a lesson.'",
    clues: [
      "Fingerprints on the pepperoni container matched someone with a culinary background.",
      "A kitchen knife with traces of pepperoni was found in the trash.",
      "He was overheard arguing with the manager about his salary earlier that day.",
      "A torn piece of the chef's uniform was found near the storeroom."
    ]
  },
  {
    name: "Krystal the Waitress",
    backstory: "A waitress saving up to open her own restaurant. Krystal recently got into trouble for sneaking ingredients out of the kitchen for her side hustle.",
    clues: [
      "A handwritten recipe for a 'perfect pizza' was found in the storeroom.",
      "Security footage showed her entering the kitchen after hours.",
      "A pizza delivery box with her name on it was left outside the restaurant.",
      "Traces of flour and pepperoni were found in her locker."
    ]
  },
  {
    name: "Josh the Dishwasher",
    backstory: "The young dishwasher who has been complaining about his job. He loves pizza but can't afford to buy the premium ingredients he craves.",
    clues: [
      "He was spotted eating a slice of pizza before the theft was discovered.",
      "He was seen leaving the restaurant in a hurry around the time of the theft.",
      "His fingerprints were found on the empty pepperoni storage container.",
      "A slice of pizza with extra pepperoni was left on near the sink."
    ]
  },
  {
    name: "Abdulahi the Manager",
    backstory: "The strict restaurant manager who has been under pressure to cut costs. Rumors suggest Abdulahi has been selling premium ingredients to competitors.",
    clues: [
      "The storeroom key was found in his office.",
      "Receipts for a mysterious 'cash sale' were found in his pocket.",
      "Security footage showed him arguing with a rival restaurant owner.",
      "A pepperoni shipment invoice was found in his trash bin."
    ]
  },
  {
    name: "Deb the Food Critic",
    backstory: "A food critic who recently gave Pepperoni Palace a scathing review. Deb has been spotted frequently at rival restaurants.",
    clues: [
      "A pepperoni sample was found in her bag after a tasting session.",
      "Her fingerprints were found on the storeroom door.",
      "She was overheard saying 'this place doesn’t deserve their fame.'",
      "A reservation at a competing restaurant was found on her phone.",
    ]
  },
  {
    name: "Carmeron the Delivery Driver",
    backstory: "The delivery driver who is known for his love of pranks. Cameron has been under scrutiny for frequently 'losing' deliveries.",
    clues: [
      "Security footage shows him near the storeroom during his break.",
      "He was seen sharing pizza with extra pepperoni at a party.",
      "He has a history of minor thefts reported by other restaurants.",
      "An empty pepperoni box was found in the back of his delivery van."
    ]
  },
  {
    name: "Jen the Sous Chef",
    backstory: "Jen is Chef Q's apprentice and has been jealous of his success. She has been seeking a way to prove herself as the better chef.",
    clues: [
      "Her fingerprints were on the storeroom lock.",
      "A torn pepperoni wrapper was found in her locker.",
      "Security footage showed her sneaking into the restaurant late at night.",
      "She was seen practicing recipes with extra pepperoni the night before."
    ]
  },
  {
    name: "Chris the Regular Customer",
    backstory: "A pizza enthusiast and frequent customer who often demands special treatment. Chris has a reputation for getting too 'hands-on' in the kitchen.",
    clues: [
      "He was caught wandering near the storeroom without permission.",
      "Traces of pepperoni were found on his jacket.",
      "He has a history of making inappropriate demands on staff.",
      "He bragged about 'knowing all the restaurant's secrets.'"
    ]
  }
];

// Timer logic
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const hintTextElement = document.getElementById("hint-text");

const timer = setInterval(() => {
  if (timeRemaining > 0) {
    timeRemaining--;
    timerElement.textContent = timeRemaining;
  } else {
    clearInterval(timer);
    endGame(false);
  }
}, 1000);

// Display suspects
function displaySuspects() {
  document.getElementById("game-container").classList.add("hidden");
  document.getElementById("suspects-page").classList.remove("hidden");

  const suspectsList = document.getElementById("suspects-list");
  suspectsList.innerHTML = ""; // Clear previous suspects

  suspects.forEach((suspect, index) => {
    const suspectDiv = document.createElement("div");
    suspectDiv.className = "suspect";
    suspectDiv.innerHTML = `
      <h4>${suspect.name}</h4>
      <p>${suspect.backstory}</p>
      <button onclick="guessSuspect(${index})">Accuse</button>
    `;
    suspectsList.appendChild(suspectDiv);
  });
}

// Provide a hint
function getHint() {
  if (hintCount < maxHints) {
    hintTextElement.textContent = suspects[correctSuspect].clues[currentClueIndex];
    currentClueIndex = (currentClueIndex + 1) % suspects[correctSuspect].clues.length;
    hintCount++;
    score -= 5; // Deduct score
    scoreElement.textContent = score;
  } else {
    hintTextElement.textContent = "No more hints available!";
  }
}

// Handle accusations
function guessSuspect(index) {
  if (index === correctSuspect) {
    score += 15; // Add 15 points for the correct guess
    scoreElement.textContent = score; // Update the score display
    endGame(true);
  } else {
    score -= 10; // Deduct 10 points for an incorrect guess
    scoreElement.textContent = score; // Update the score display
    alert("Wrong guess! Try again.");
  }
}

// End the game
function endGame(won) {
  clearInterval(timer);
  document.getElementById("end-screen").classList.remove("hidden");
  document.getElementById("game-container").classList.add("hidden");
  document.getElementById("suspects-page").classList.add("hidden");

  const endMessage = document.getElementById("end-message");
  if (won) {
    endMessage.textContent = `Congratulations! You found the culprit, ${suspects[correctSuspect].name}! Your final score is ${score}.`;
  } else {
    endMessage.textContent = `Time's up! The pepperoni thief got away. Your final score is ${score}.`;
  }
}

// Return to Main Menu
function returnToMainMenu() {
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("suspects-page").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  hintTextElement.textContent = ""; // Clear hint text
}

// Button Event Listeners
document.getElementById("suspects-button").addEventListener("click", displaySuspects);
document.getElementById("hint-button").addEventListener("click", getHint);
document.getElementById("back-button").addEventListener("click", returnToMainMenu);
document.getElementById("main-menu-button").addEventListener("click", returnToMainMenu);

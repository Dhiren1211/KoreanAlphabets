// Basic Hangul letters and syllable combinations
const romanizedMap = {
    // Basic consonants
    "ㄱ": "ga", "ㄴ": "na", "ㄷ": "da", "ㄹ": "ra/la", "ㅁ": "ma", "ㅂ": "ba",
    "ㅅ": "sa", "ㅇ": "a/nga", "ㅈ": "ja", "ㅊ": "chha", "ㅋ": "kha",
    "ㅌ": "tha", "ㅍ": "pha", "ㅎ": "ha",

    // Basic vowels
    "ㅏ": "aa", "ㅑ": "ya", "ㅓ": "a", "ㅕ": "ya", "ㅗ": "o",
    "ㅛ": "yo", "ㅜ": "u", "ㅠ": "yu", "ㅡ": "eu", "ㅣ": "i"
};

// Function to generate mixed letters (syllables)
const generateSyllables = (consonants, vowels) => {
    const syllables = {};
    consonants.forEach(consonant => {
        vowels.forEach(vowel => {
            const syllable = consonant + vowel; // Combine Hangul characters
            const romanized = romanizedMap[consonant] + romanizedMap[vowel]; // Combine Romanization
            syllables[syllable] = romanized;
        });
    });
    return syllables;
};

// Extract consonants and vowels from the map
const consonants = Object.keys(romanizedMap).filter(c => c.match(/[ㄱ-ㅎ]/));
const vowels = Object.keys(romanizedMap).filter(v => v.match(/[ㅏ-ㅣ]/));

// Create all possible syllables
const mixedLetters = generateSyllables(consonants, vowels);

// Define display modes
let currentMode = "single"; // "single" or "mixed"
const singleLetters = { ...romanizedMap };
const allCharacters = { ...singleLetters, ...mixedLetters }; // For reference panel

// DOM Elements
const alphabetDisplay = document.getElementById('alphabet-display');
const userAnswer = document.getElementById('user-answer');
const submitBtn = document.getElementById('submit-btn');
const toggleBtn = document.getElementById('toggle-btn');
const feedback = document.getElementById('feedback');
const referenceList = document.getElementById('reference-list');

// Track score
let totalQuestions = 0;
let correctAnswers = 0;

// Function to populate the reference panel
function populateReference() {
    referenceList.innerHTML = ""; // Clear previous entries
    const letters = currentMode === "single" ? singleLetters : mixedLetters;
    for (const [letter, romanized] of Object.entries(letters)) {
        const item = document.createElement('div');
        item.classList.add('reference-item');
        item.innerHTML = `
            <span>${letter}</span>
            <span class="romanized">${romanized}</span>
        `;
        referenceList.appendChild(item);
    }
}

// Function to pick a random character
function getRandomCharacter() {
    const keys = currentMode === "single" ? Object.keys(singleLetters) : Object.keys(mixedLetters);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
}

// Function to start the quiz
function startQuiz() {
    const randomCharacter = getRandomCharacter();
    alphabetDisplay.textContent = randomCharacter;
    feedback.textContent = '';
    userAnswer.value = '';
}

// Toggle between modes
toggleBtn.addEventListener('click', () => {
    currentMode = currentMode === "single" ? "mixed" : "single";
    toggleBtn.textContent = currentMode === "single" ? "Switch to Mixed Letters" : "Switch to Single Letters";
    populateReference();
    startQuiz();
});

// Event listener for the submit button
submitBtn.addEventListener('click', () => {
    const userInput = userAnswer.value.trim().toLowerCase();
    const displayedCharacter = alphabetDisplay.textContent;
    const correctAnswer = currentMode === "single" ? singleLetters[displayedCharacter] : mixedLetters[displayedCharacter];

    // Increment total questions
    totalQuestions++;

    if (userInput === correctAnswer) {
        correctAnswers++; // Increment correct answers
        feedback.textContent = `Correct! ${correctAnswers}/${totalQuestions}`;
        feedback.style.color = 'green';
    } else {
        feedback.textContent = `Incorrect! The correct answer is "${correctAnswer}". ${correctAnswers}/${totalQuestions}`;
        feedback.style.color = 'red';
    }

    setTimeout(startQuiz, 2000);
});

// Initialize
populateReference();
startQuiz();

// Basic Hangul letters and syllable combinations
const romanizedMap = {
    // Basic consonants
    "ㄱ": "g/k", "ㄴ": "n", "ㄷ": "d/t", "ㄹ": "r/l", "ㅁ": "m", "ㅂ": "b/p",
    "ㅅ": "s", "ㅇ": "ng", "ㅈ": "j", "ㅊ": "ch", "ㅋ": "k", "ㅌ": "t",
    "ㅍ": "p", "ㅎ": "h",

    // Basic vowels
    "ㅏ": "a", "ㅑ": "ya", "ㅓ": "eo", "ㅕ": "yeo", "ㅗ": "o",
    "ㅛ": "yo", "ㅜ": "u", "ㅠ": "yu", "ㅡ": "eu", "ㅣ": "i"
};

// Provided syllable combinations with Romanized names
const syllableMappings = {
    // ㅐ combinations
    "개": "gae", "내": "nae", "대": "dae", "래": "rae", "매": "mae", "배": "bae",
    "새": "sae", "애": "ae", "재": "jae", "채": "chae", "캐": "kae", "태": "tae",
    "패": "pae", "해": "hae",

    // ㅒ combinations
    "걔": "gyae", "냬": "nyae", "댸": "dyae", "럐": "ryae", "먜": "myae", "뱨": "byae",
    "섀": "syae", "얘": "yae", "쟤": "jyae", "챼": "chyae", "컈": "kyae", "턔": "tyae",
    "퍠": "pyae", "햬": "hyae",

    // ㅔ combinations
    "게": "ge", "네": "ne", "데": "de", "레": "re", "메": "me", "베": "be",
    "세": "se", "에": "e", "제": "je", "체": "che", "케": "ke", "테": "te",
    "페": "pe", "헤": "he",

    // ㅖ combinations
    "계": "gye", "녜": "nye", "뎨": "dye", "례": "rye", "몌": "mye", "볘": "bye",
    "셰": "sye", "예": "ye", "졔": "jye", "쳬": "chye", "켸": "kye", "톄": "tye",
    "폐": "pye", "혜": "hye",

    // ㅘ combinations
    "과": "gwa", "놔": "nwa", "돠": "dwa", "롸": "rwa", "뫄": "mwa", "봐": "bwa",
    "솨": "swa", "와": "wa", "좌": "jwa", "촤": "chwa", "콰": "kwa", "톼": "twa",
    "퐈": "pwa", "화": "hwa",

    // ㅙ combinations
    "괘": "gwae", "놰": "nwae", "돼": "dwae", "뢔": "rwae", "뫠": "mwae", "봬": "bwae",
    "쇄": "swae", "왜": "wae", "좨": "jwae", "쵀": "chwae", "쾌": "kwae", "퇴": "twae",
    "퐤": "pwae", "홰": "hwae",

    // ㅚ combinations
    "괴": "goe", "뇌": "noe", "되": "doe", "뢰": "roe", "뫼": "moe", "뵈": "boe",
    "쇠": "soe", "외": "oe", "죄": "joe", "최": "choe", "쾨": "koe", "퇴": "toe",
    "푀": "poe", "회": "hoe",

    // ㅝ combinations
    "궈": "gwo", "눠": "nwo", "둬": "dwo", "뤄": "rwo", "뭐": "mwo", "붜": "bwo",
    "숴": "swo", "워": "wo", "줘": "jwo", "춰": "chwo", "쿼": "kwo", "퉈": "two",
    "풔": "pwo", "훠": "hwo",

    // ㅞ combinations
    "궤": "gwe", "눼": "nwe", "뒈": "dwe", "뤠": "rwe", "뭬": "mwe", "붸": "bwe",
    "쉐": "swe", "웨": "we", "줴": "jwe", "췌": "chwe", "퀘": "kwe", "퉤": "twe",
    "풰": "pwe", "훼": "hwe",

    // ㅟ combinations
    "귀": "gwi", "뉘": "nwi", "뒤": "dwi", "뤼": "rwi", "뮈": "mwi", "뷔": "bwi",
    "쉬": "swi", "위": "wi", "쥐": "jwi", "취": "chwi", "퀴": "kwi", "튀": "twi",
    "퓌": "pwi", "휘": "hwi",

    // ㅢ combinations
    "긔": "gui", "늬": "nui", "듸": "dui", "릐": "rui", "믜": "mui", "븨": "bui",
    "싀": "sui", "의": "ui", "즤": "jui", "츼": "chui", "킈": "kui", "틔": "tui",
    "픠": "pui", "희": "hui"
};


// Combine single letters and syllable mappings
const singleLetters = { ...romanizedMap };
const mixedLetters = syllableMappings; // Use provided syllable mappings
const allCharacters = { ...singleLetters, ...mixedLetters }; // For reference panel

// Define display modes
let currentMode = "single"; // "single" or "mixed"

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

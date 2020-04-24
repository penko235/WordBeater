window.addEventListener(`load`, init);

//Available levels
const levels = {
    Easy: 5,
    Medium: 3,
    Hard: 2
}

//To change level
// let currentLevel = levels.Hard;
let currentLevel = 0;
//Globals
let time = 0;
let score = 0;
let isPlaying;

//DOM Elements
const wordInput = document.querySelector(`#input`);
const currentWord = document.querySelector(`#current-word`);
const scoreDisplay = document.querySelector(`#score`);
const timeDisplay = document.querySelector(`#time`);
const message = document.querySelector(`#message`);
const seconds = document.querySelector(`#seconds`);
const difficulty = document.querySelector(`#difficulty`);


const words = [
    'penko',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'plovdiv',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition',
    `galaxy`,
    `mercedes`,
    `secret`,
];

//Initialize Game

function init() {
    //Show number of seconds
    seconds.textContent = currentLevel;
    //Load random word from array
    randomWord(words)
    //Start matching on word input
    wordInput.addEventListener(`input`, startMatch)
    //Call countdown every second
    setInterval(countdown, 1000);
    //Check game status
    setInterval(checkStatus, 50);
    // // Select difficulty
    selectDifficulty()
}

function selectDifficulty() {

    // let difficultyEasy = document.querySelector(`#difficulty`).options.item(0).textContent;
    // console.log(difficultyEasy)
    // let difficultyMedium = document.querySelector(`#difficulty`).options.item(1).textContent;
    // console.log(difficultyMedium)
    // let difficultyHard = document.querySelector(`#difficulty`).options.item(2).textContent;
    // console.log(difficultyHard)

    difficulty.addEventListener(`click`, () => {

        if (difficulty.value === `easy`) {
            currentLevel = levels.Easy;
            time = currentLevel;
            seconds.textContent = currentLevel;
        } else if (difficulty.value === `medium`) {
            currentLevel = levels.Medium;
            time = currentLevel;
            seconds.textContent = currentLevel;
        } else if (difficulty.value === `hard`) {
            currentLevel = levels.Hard;
            time = currentLevel;
            seconds.textContent = currentLevel;  
        }
    })

}

//Pick and show random word
function randomWord(words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    //Output random word
    currentWord.textContent = words[randomIndex];
}

//Start Match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        randomWord(words);
        wordInput.value = ``;
        score++;
    }
    //If score is negative(-1) , display 0 
    if (score === -1) {
        scoreDisplay.textContent = 0
    } else {
        scoreDisplay.textContent = score;
    }
}


//Match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.textContent) {
        message.textContent = `CORRECT!`
        message.style.color = `green`;
        return true;
    } else {
        message.textContent = ``;
        return false;
    }
}
//Countdown timer
function countdown() {
    //Make sure time is not run out
    if (time > 0) {
        time--;
    } else if (time === 0) {
        //Game Over
        isPlaying = false;
    }
    // Show time
    timeDisplay.textContent = time;
}



//Checking status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.textContent = `GAME OVER !`;
        message.style.color = `red`;
        score = -1;
    }
}

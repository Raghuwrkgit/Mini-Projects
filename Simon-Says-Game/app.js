const colors = ["red", "yellow", "green", "purple"];

let gameSequence = [];
let userSequence = [];

let level = 0;
let highestScore = 0;
let isPlaying = false;

const levelText = document.getElementById("level");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const buttons = document.querySelectorAll(".btn");

const sounds = {
    red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    purple: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

startBtn.addEventListener("click", startGame);

function startGame() {
    level = 0;
    gameSequence = [];
    userSequence = [];
    isPlaying = true;
    message.innerText = "Watch the sequence!";
    updateLevelText();
    nextLevel();
}

function updateLevelText() {
    levelText.innerText = "Level: " + level + " | High Score: " + highestScore;
}

function nextLevel() {
    level++;
    userSequence = [];
    updateLevelText();

    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);

    playSequence();
}

function playSequence() {
    let i = 0;

    let interval = setInterval(() => {
        flashButton(gameSequence[i]);
        i++;

        if (i === gameSequence.length) {
            clearInterval(interval);
            message.innerText = "Your turn!";
        }
    }, 700);
}

function flashButton(color) {
    let btn = document.querySelector("." + color);
    btn.classList.add("active");
    sounds[color].play();

    setTimeout(() => {
        btn.classList.remove("active");
    }, 400);
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!isPlaying) return;

        let color = btn.dataset.color;
        userSequence.push(color);

        flashButton(color);
        checkAnswer(userSequence.length - 1);
    });
});

function checkAnswer(index) {
    if (userSequence[index] !== gameSequence[index]) {
        gameOver();
        return;
    }

    if (userSequence.length === gameSequence.length) {
        message.innerText = "Correct! Next level...";
        setTimeout(nextLevel, 1000);
    }
}

function gameOver() {
    isPlaying = false;

    if (level > highestScore) {
        highestScore = level - 1;
    }

    level = 0;
    updateLevelText();
    message.innerText = "Game Over! Press Start to Play Again.";
}

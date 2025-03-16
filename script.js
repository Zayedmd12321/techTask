const screenHeight = 512;
const screenWidth = 288;
const baseHeight = 110;
const gameArea = screenHeight - baseHeight;
const gameContainer = document.querySelector('.game-container');
const pointSound = new Audio('gallery/audio/point.wav');
const wingSound = new Audio('gallery/audio/wing.wav');
const hitSound = new Audio('gallery/audio/hit.wav');
let score = -1;
let fallInterval = null;

welcome();

function playAudio(audio) {
    audio.currentTime = 0;
    audio.play();
}

function welcome() {
    gameContainer.innerHTML = `        
            <div class="message"></div>
            <div id="base"></div> 
    `;
    chk();
}

function chk() {
    window.onkeydown = (e) => {
        if (e.keyCode === 32)
            jump();
    };
}

let birdVelocity = 0;
const gravity = 0.5;
const lift = -5;

function jump() {
    playAudio(wingSound);
    initializeGame();
    birdVelocity = lift;  // Apply an initial negative velocity to simulate flapping
}



function initializeGame() {
    if (!document.querySelector('.lower-pipe')) {
        gameContainer.innerHTML = `
            <div id="player"></div>
            <div class="lower-pipe"></div>
            <div class="upper-pipe"></div>
            <div id="base"></div>
            <div class="game-score">Score:<span id="score">0</span></div>
        `;
        setupPipeAnimation();
        applyGravity();
    }
}

function setupPipeAnimation() {
    const lowerPipe = document.querySelector('.lower-pipe');
    const upperPipe = document.querySelector('.upper-pipe');

    lowerPipe.addEventListener('animationiteration', () => {
        updatePipePositions(lowerPipe, upperPipe);
    });
}

function updatePipePositions(lowerPipe, upperPipe) {
    const gameScore = document.getElementById('score');
    const offset = parseInt(gameArea * 0.3);
    let lowerPipeHeight = Math.random() * (gameArea - 1.2 * offset) + 30;
    lowerPipe.style.height = `${lowerPipeHeight}px`;
    upperPipe.style.height = `${gameArea - lowerPipeHeight - offset + 10}px`;
    score += 1;
    gameScore.innerText = score;
    playAudio(pointSound);
}

function applyGravity() {
    clearInterval(fallInterval);
    const bird = document.getElementById('player');

    fallInterval = setInterval(() => {
        birdVelocity += gravity;  // Gravity increases velocity downward
        let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'));

        bird.style.top = (birdTop + birdVelocity) + 'px'; // Apply velocity change

        checkCollision(bird);
    }, 20);
}


function checkCollision(bird) {
    const lowerPipe = document.querySelector('.lower-pipe');
    const upperPipe = document.querySelector('.upper-pipe');

    if (!lowerPipe || !upperPipe) return;

    const birdRect = bird.getBoundingClientRect();
    const lowerPipeRect = lowerPipe.getBoundingClientRect();
    const upperPipeRect = upperPipe.getBoundingClientRect();
    birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'));
    if (
        birdTop <= 0 || birdTop >= gameArea - bird.clientHeight ||
        (birdRect.right > lowerPipeRect.left && birdRect.left < lowerPipeRect.right &&
            birdRect.bottom > lowerPipeRect.top) ||
        (birdRect.right > upperPipeRect.left && birdRect.left < upperPipeRect.right &&
            birdRect.top < upperPipeRect.bottom)
    ) {
        playAudio(hitSound);
        gameOver();
    }
}

function gameOver() {
    clearInterval(fallInterval);
    if(score==-1) score=0;
    gameContainer.innerHTML = `
        <div id="base"></div>
        <div class="game-over"></div>
        <div class = "score">Score:${score}</div>
    `;
    score = -1;
    window.onkeydown = () => {
        welcome();
    };
}

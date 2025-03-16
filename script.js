const screenHeight = 512;
const screenWidth = 288;
const baseHeight = 110;
const gameArea = screenHeight - baseHeight;
const gameContainer = document.querySelector('.game-container');
let score = 0;
let fallInterval = null;

welcome();

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
const lift = -8;

function jump() {
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
    const offset = parseInt(gameArea * 0.3);
    let lowerPipeHeight = Math.random() * (gameArea - 1.2 * offset) + 30;
    lowerPipe.style.height = `${lowerPipeHeight}px`;
    upperPipe.style.height = `${gameArea - lowerPipeHeight - offset + 10}px`;
    score += 1;
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
        gameOver();
    }
}

function gameOver() {
    clearInterval(fallInterval);
    score = 0;
    gameContainer.innerHTML = `
        <div id="base"></div>
        <div class="game-over"></div>
    `;
    window.onkeydown = () => {
        welcome();
    };
}

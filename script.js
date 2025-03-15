const screenHeight = 512;
const screenWidth = 288;
const baseHeight = 110;

const gameArea = screenHeight-baseHeight;

const gameContainer = document.querySelector('.game-container')

let score = 0;

window.onkeydown = (e) => {
    if (e.keyCode == 32) {
        jump();
    }
};

function jump() {
    initializePipes();
}

function initializePipes() {
    if (!document.querySelector('.lower-pipe')) {
        gameContainer.innerHTML = `
            <div id="player"></div>
            <div class="lower-pipe"></div>
            <div class="upper-pipe"></div>
            <div id="base"></div>
        `;

        setupPipeAnimation();
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
    let lowerPipe_height = parseInt(Math.random() * (gameArea - 1.2 * offset) + 30);
    lowerPipe.style.height = `${lowerPipe_height}px`;
    upperPipe.style.height = `${gameArea - lowerPipe_height - offset + 10}px`;

    score += 1;
}
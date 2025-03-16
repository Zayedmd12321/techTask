const screenHeight = 512;
const screenWidth = 288;
const baseHeight = 110;

const gameArea = screenHeight-baseHeight;

const gameContainer = document.querySelector('.game-container')

let score = 0;

window.onkeydown = (e) => {
    console.log(e.keyCode);
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


document.addEventListener('keydown', (event) => {
    const bird = document.getElementById('player');
    if (event.code === 'Space') {
        let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'));
        bird.style.top = (birdTop - 30 ) + 'px';
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        const bird = document.getElementById('player');
        const lowerPipe = document.querySelector('.lower-pipe');
        const upperPipe = document.querySelector('.upper-pipe');
        let fallInterval = setInterval(() => {
            let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'));
            if (birdTop < gameArea - bird.clientHeight) {
                bird.style.top = (birdTop + 1) + 'px';
            } else {
                clearInterval(fallInterval);
            }
            
    if (birdTop <= 0 || birdTop >= gameArea - bird.clientHeight) {
                clearInterval(fallInterval);
                alert('Game Over. Score: ' + score);
                bird.style.top = '100px';
                score = 0;}
            
    if (bird.getBoundingClientRect().right > lowerPipe.getBoundingClientRect().left && bird.getBoundingClientRect().left < lowerPipe.getBoundingClientRect().right &&
        bird.getBoundingClientRect().bottom > lowerPipe.getBoundingClientRect().top) {
        gameOver();
    }
    if (bird.getBoundingClientRect().right > upperPipe.getBoundingClientRect().left && bird.getBoundingClientRect().left < upperPipe.getBoundingClientRect().right &&
        bird.getBoundingClientRect().top < upperPipe.getBoundingClientRect().bottom) {
        gameOver();
    }
} , 20);
    }
});
function gameOver() {
    alert('Game Over. Score: ' + score);
    bird.style.top = '100px';
    score = 0;
}


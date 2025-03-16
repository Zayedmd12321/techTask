const screenHeight = 512;
const screenWidth = 288;
const baseHeight = 110;

const gameArea = screenHeight-baseHeight;

let lowerPipe = document.querySelector('.lower-pipe');
let upperPipe = document.querySelector('.upper-pipe');
let score = 0;

lowerPipe.addEventListener('animationiteration',() => {
    const offset = parseInt(gameArea*0.3);
    if (score>0){
        lowerPipe.style.right = '-52px'
        upperPipe.style.right = '-52px'
    }
    let lowerPipe_height = parseInt(Math.random()*(gameArea-1.2*offset)+30);
    lowerPipe.style.height = `${lowerPipe_height}px`;
    upperPipe.style.height = `${gameArea-lowerPipe_height-offset+10}px`;
    score+=1;
});
let bird =document.getElementById('player');
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue('top'));
        bird.style.top = (birdTop - 30 ) + 'px';
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
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

    // Check collision with upper pipe
    if (bird.getBoundingClientRect().right > upperPipe.getBoundingClientRect().left && bird.getBoundingClientRect().left < upperPipe.getBoundingClientRect().right &&
        bird.getBoundingClientRect().top < upperPipe.getBoundingClientRect().bottom) {
        gameOver();
    }
} , 100);
    }
});
function gameOver() {
    alert('Game Over. Score: ' + score);
    bird.style.top = '100px';
    score = 0;
}


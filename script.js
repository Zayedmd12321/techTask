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
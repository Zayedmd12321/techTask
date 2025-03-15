const screenHeight = 512;
const screenWidth = 288;
const baseHeight = 110;

const gameArea = screenHeight-baseHeight;

let lowerPipe1 = document.querySelector('.lower-pipe');
let upperPipe1 = document.querySelector('.upper-pipe');

lowerPipe.addEventListener('animationiteration',() => {
    const offset = parseInt(gameArea*0.3);
    let lowerPipe_height = parseInt(Math.random()*(gameArea-1.2*offset)+30)
    lowerPipe.style.height = `${lowerPipe_height}px`
    upperPipe.style.height = `${gameArea-lowerPipe_height-offset+10}px`
});
const canevas = document.getElementById('canevas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

virusPop();

daysLeft = 60;
GameOverNumber = 50;
loopPlay = false;

function start(){
    count = 0;
    getFaster = 6000;
    daysRemaining = daysLeft;

    canevas.innerHTML = '';
    score.innerHTML = count; 
    days.innerHTML = daysRemaining;

    // make sure to not play loop several times
    loopPlay ? '' : game();
    loopPlay = true;

    game();

    function game(){
        let randomTime = Math.round(Math.random() * getFaster);
        getFaster > 700 ? getFaster = (getFaster * 0.90) : '';

        setTimeout(() => { 
            if (daysRemaining === 0){
                youWin();
            } else if (canevas.childElementCount < GameOverNumber){
                virusPop();
                game();
            } else {
                gameOver();
            }
        }, randomTime)
    }
    const gameOver = () => {
        endScreen.innerHTML = `<div class = "gameOver">Game Over<br/>score : ${count} </div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1'; 
        loopPlay = false;
    }

    const youWin = () => {
        let accuracy = Math.round(count / daysLeft * 100);
        endScreen.innerHTML = `<div class = 'youWin'>Bravo<br/><span>Precision : ${accuracy}% </span></div>`;
    }


} 

function virusPop() {
    let virus = new Image();

    virus.src = './media/basic-pics/pngwave.png';

    virus.classList.add('virus');
    virus.style.top = Math.random() * 500 + 'px';
    virus.style.left = Math.random() * 500 + 'px';

    let x,y;
    x = y = (Math.random() * 45) + 30;
    virus.style.setProperty('--x', `${x}px`);
    virus.style.setProperty('--y', `${y}px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1;
    let trX = Math.random() * 500 + plusMinus;
    let trY = Math.random() * 500 + plusMinus;
    virus.style.setProperty('--trX', `${trX}%`);
    virus.style.setProperty('--trY', `${trY}%`);


    canevas.appendChild(virus);
}

//Remove Element Clicked
document.addEventListener('click', function(e){
    let targetElement = e.target || e.secElement;

    if (targetElement.classList.contains('virus')){
        targetElement.remove();
        count++;
        score.innerHTML = count;
    }
});

// countdown click
canevas.addEventListener('click', () => {
    if (daysRemaining > 0) {
        daysRemaining--;
        days.innerHTML = daysRemaining;
    }
})

// hide screen on click
endScreen.addEventListener('click', () => {
    setTimeout(() => {
        start();
        endScreen.style.opacity = '0';
        endScreen.style.visibility = 'hidden';
    }, 3500)
})
    
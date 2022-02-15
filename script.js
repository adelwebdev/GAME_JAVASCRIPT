const canevas = document.getElementById('canevas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

virusPop();

daysLeft = 60;
GamepadoverNumber = 50;

function start(){
    count = 0;
    getFaster = 6000;
    daysRemaining = daysLeft;

    canevas.innerHTML = '';
    score.innerHTML = count;
    days.innerHTML = daysRemaining;

    game();

    function game(){
        let randomTime = Math.round(Math.random() * getFaster);
        getFaster > 700 ? getFaster = (getFaster * 0.90) : '';

        setTimeout(() => {
            virusPop();
            game();
        }, randomTime)
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
})

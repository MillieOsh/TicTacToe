const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];//array of other arrays. my winning sequences

//setting them for each quadrant- loop from html 
const grid = () => Array.from(document.getElementsByClassName('q'));
const qNumId = (qEl) => Number.parseInt(qEl.id.replace('q', ''));
//convert from string to number

const emptyQs = () => grid().filter(_qEl => _qEl.innerText === '');
//return array of all quadrants with no X or 0- opponent select

const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== ''); 
//takes array and checks if all arrays are same

const takeTurn = (index, letter) => grid()[index].innerText = letter;
//put x or o according to turn
const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);
//opponent pick random quadrant w/ no decimal rounding
const endGame = (winningSequence) => { 
    winningSequence.forEach(_qEl => _qEl.classList.add('winner'));
    disableListeners();
};
const checkForVictory = () => {
    let victory = false;
    winningCombos.forEach(_c => {
        const _grid = grid();
        const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
        if(allSame(sequence)) {
            victory = true;
            endGame(sequence);
        }
    });//loop thru winning combos- c= which array- if any are the same
    return victory;
};
//so we can have alternating turns

const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        takeTurn(opponentChoice(), 'o');
        if(!checkForVictory())
            enableListeners();
    }, 1000);//waits one second for opponent to make move
}

const clickFn = ($event) => {
    takeTurn(qNumId($event.target), 'x');
    if(!checkForVictory())
        opponentTurn();
};//if no winner go to opponent move

const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener('click', clickFn));
//calling grid() represents array of  query list of all elements
const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener('click', clickFn));
//removing event listeners when we dont want to use them
enableListeners();

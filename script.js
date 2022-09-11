const X_CLASS = 'x';
const O_CLASS = 'o';
let P1 = "X", P2 = "O";
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById("restartButton");
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let OTurn;
letsBegin();

function letsBegin() {
    P1 = prompt("Enter player 1 name: ") || "X";
    P2 = prompt("Enter player 2 name: ") || "O";
    OTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    })
    boardHover();
    winningMessageElement.classList.remove("show");

};

restartButton.addEventListener('click', letsBegin);

function handleClick(e) {
    // Check Turn
    const cell = e.target;
    const currentClass = OTurn ? O_CLASS: X_CLASS;

    // Place the mark
    placeMark(cell, currentClass);

    // Check for win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    }
    //check for draw

    // Switch turns
    swapTurn();
    boardHover();

}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a DRAW!";
    } else {
        winningMessageTextElement.innerText = `${OTurn ? P2: P1} Wins!`;
    }
    winningMessageElement.classList.add("show");
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    OTurn = OTurn ? false: true
}

function boardHover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (OTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}





























//your JS code here. If required.
const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const setupDiv = document.getElementById('setup');
const gameBoardDiv = document.getElementById('game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

let player1, player2;
let currentPlayer;
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

submitBtn.addEventListener('click', () => {
    player1 = player1Input.value || "Player 1";
    player2 = player2Input.value || "Player 2";
    
    currentPlayer = player1;
    setupDiv.style.display = 'none';
    gameBoardDiv.style.display = 'block';
    messageDiv.innerText = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = parseInt(e.target.id) - 1;

        if (boardState[index] !== "" || !gameActive) return;

        const mark = (currentPlayer === player1) ? "x" : "o";
        boardState[index] = mark;
        e.target.innerText = mark;

        if (checkWin()) {
            messageDiv.innerText = `${currentPlayer}, congratulations you won!`;
            gameActive = false;
        } else if (!boardState.includes("")) {
            messageDiv.innerText = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            messageDiv.innerText = `${currentPlayer}, you're up`;
        }
    });
});

function checkWin() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            // Apply purple background to winning cells
            [a, b, c].forEach(i => document.getElementById(i + 1).classList.add('winner'));
            return true;
        }
    }
    return false;
}
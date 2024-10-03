let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let currentUser = '';
let userScore = 0;
let computerScore = 0;
let gameActive = true;
let userId = generateUserId();
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function generateUserId() {
    return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit user ID
}

function setUserName() {
    currentUser = document.getElementById('username').value;
    document.getElementById('current-user').innerText = currentUser;
    document.getElementById('user-id').innerText = `${currentUser}_${userId}`;
    document.getElementById('account-user-id').innerText = userId;
    document.getElementById('account-user-score').innerText = userScore;
    document.getElementById('welcome-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    createBoard();
}

function createBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.addEventListener('click', () => handleCellClick(index));
        cellDiv.innerText = cell;
        boardDiv.appendChild(cellDiv);
    });
}

function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return;
    board[index] = currentPlayer;
    checkResult();
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            setTimeout(() => computerMove(), 500);
        }
    }
    createBoard();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') continue;
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        document.getElementById('message').innerText = `${currentPlayer} wins!`;
        updateScore(currentPlayer);
        gameActive = false;
        return;
    }
    if (!board.includes('')) {
        document.getElementById('message').innerText = 'Game ended in a draw!';
        gameActive = false;
    }
}

function updateScore(winner) {
    if (winner === 'X') {
        userScore++;
        document.getElementById('user-score').innerText = userScore;
    } else {
        computerScore++;
        document.getElementById('computer-score').innerText = computerScore;
    }
}

function computerMove() {
    let availableCells = board.map((cell, index) => (cell === '' ? index : null)).filter(cell => cell !== null);
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    board[availableCells[randomIndex]] = currentPlayer;
    checkResult();
    createBoard();
    currentPlayer = 'X'; // Switch back to user
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('message').innerText = '';
    createBoard();
}

function showSection(section) {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('account').style.display = 'none';
    document.getElementById('games').style.display = 'none';

    if (section === 'game') {
        document.getElementById('game-container').style.display = 'block';
    } else if (section === 'leaderboard') {
        document.getElementById('leaderboard').style.display = 'block';
    } else if (section === 'account') {
        document.getElementById('account').style.display = 'block';
    } else if (section === 'games') {
        document.getElementById('games').style.display = 'block';
    }
}

function goToGame() {
    showSection('game');
}

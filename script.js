const gameBoard = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X'; 
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


const checkWinner = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return true;
  }

  const roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDisplay.textContent = 'Draw!';
    gameActive = false;
    return true;
  }

  return false;
};


const aiMove = () => {
 
  let availableCells = [];
  gameBoard.forEach((cell, index) => {
    if (gameState[index] === '') availableCells.push(index);
  });


  if (availableCells.length > 0) {
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = 'O';
    gameBoard[randomIndex].textContent = 'O';
    
    if (!checkWinner()) {
      currentPlayer = 'X';
      statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
};


const handleCellClick = (event) => {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive || currentPlayer !== 'X') {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (!checkWinner()) {
    currentPlayer = 'O'; 
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;

   
    setTimeout(() => {
      if (gameActive) aiMove();
    }, 500);
  }
};


const resetGame = () => {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  gameBoard.forEach(cell => cell.textContent = '');
};


gameBoard.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);


statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;







const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(index) {
  if (!gameActive || boardState[index] !== '') return;

  boardState[index] = currentPlayer;
  renderBoard();
  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function renderBoard() {
  board.innerHTML = '';
  boardState.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => handleClick(index));
    board.appendChild(cell);
  });
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      message.textContent = `${currentPlayer === 'X' ? 'X' : 'O'} wins!`;
      return;
    }
  }

  if (!boardState.includes('')) {
    gameActive = false;
    message.textContent = 'It\'s a tie!';
  }
}

renderBoard();

//your JS code here. If required.
let player1 = "";
let player2 = "";
let currentPlayer = "";
let gameOver = false;

const submitBtn = document.getElementById("submit");
const messageEl = document.querySelector(".message");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value || "Player1";
  player2 = document.getElementById("player2").value || "Player2";
  currentPlayer = player1;
  messageEl.textContent = `${currentPlayer}, you're up`;
  resetBoard();
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (gameOver || cell.classList.contains("taken")) return;

    const mark = currentPlayer === player1 ? "x" : "o";
    cell.textContent = mark;
    cell.classList.add("taken");

    if (checkWinner(mark)) {
      messageEl.textContent = `${currentPlayer} congratulations you won!`;
      gameOver = true;
      return;
    }

    if ([...cells].every(c => c.classList.contains("taken"))) {
      messageEl.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    // switch player
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageEl.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner(mark) {
  const winPatterns = [
    [1,2,3], [4,5,6], [7,8,9], // rows
    [1,4,7], [2,5,8], [3,6,9], // cols
    [1,5,9], [3,5,7]           // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(i => document.getElementById(i.toString()).textContent === mark)
  );
}

function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  gameOver = false;
}


//your JS code here. If required.
    const submitBtn = document.getElementById("submit");
    const form = document.getElementById("playersForm");
    const board = document.getElementById("gameBoard");
    const messageDiv = document.getElementById("message");
    const cells = document.querySelectorAll(".cell");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "X";
    let gameOver = false;

    // Winning combinations
    const winPatterns = [
      [1,2,3], [4,5,6], [7,8,9],  // rows
      [1,4,7], [2,5,8], [3,6,9],  // cols
      [1,5,9], [3,5,7]            // diagonals
    ];

    // Start game when players submit
    submitBtn.addEventListener("click", () => {
      player1 = document.getElementById("player-1").value || "Player 1";
      player2 = document.getElementById("player-2").value || "Player 2";

      form.style.display = "none";
      board.style.display = "block";

      currentPlayer = player1;
      messageDiv.textContent = `${currentPlayer}, you're up!`;
    });

    // Cell click handler
    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        if (gameOver || cell.textContent !== "") return;

        cell.textContent = currentSymbol;
        cell.classList.add("taken");

        if (checkWinner()) {
          messageDiv.textContent = `${currentPlayer}, congratulations you won! 🎉`;
          gameOver = true;
          return;
        }

        // Switch turn
        if (currentPlayer === player1) {
          currentPlayer = player2;
          currentSymbol = "O";
        } else {
          currentPlayer = player1;
          currentSymbol = "X";
        }
        messageDiv.textContent = `${currentPlayer}, you're up!`;
      });
    });

    // Check for winner
    function checkWinner() {
      return winPatterns.some(pattern => {
        return pattern.every(id => {
          return document.getElementById(id).textContent === currentSymbol;
        });
      });
    }

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const gameInfo = document.getElementById('game-info');
    const resetButton = document.getElementById('reset-button');

    const BOARD_SIZE = 15;
    let board = [];
    let currentPlayer = 1; // 1 for black, 2 for white
    let isGameOver = false;

    function initGame() {
        board = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));
        currentPlayer = 1;
        isGameOver = false;
        gameInfo.textContent = '흑돌의 차례입니다.';
        gameBoard.innerHTML = ''; // Clear existing cells and stones

        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameBoard.appendChild(cell);
            }
        }
    }

    function checkWin(row, col) {
        const player = board[row][col];

        // Directions to check: horizontal, vertical, diagonal (top-left to bottom-right), anti-diagonal (top-right to bottom-left)
        const directions = [
            [0, 1],   // Horizontal
            [1, 0],   // Vertical
            [1, 1],   // Diagonal \
            [1, -1]   // Anti-diagonal /
        ];

        for (const [dr, dc] of directions) {
            let count = 1;

            // Check in one direction
            for (let i = 1; i < 5; i++) {
                const r = row + dr * i;
                const c = col + dc * i;
                if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
                    count++;
                } else {
                    break;
                }
            }

            // Check in the opposite direction
            for (let i = 1; i < 5; i++) {
                const r = row - dr * i;
                const c = col - dc * i;
                if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === player) {
                    count++;
                } else {
                    break;
                }
            }

            if (count >= 5) {
                return true;
            }
        }
        return false;
    }

    gameBoard.addEventListener('click', (event) => {
        if (isGameOver) return;

        const cell = event.target.closest('.cell');
        if (!cell) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (board[row][col] !== 0) {
            return; // Cell is already occupied
        }

        board[row][col] = currentPlayer;

        const stone = document.createElement('div');
        stone.classList.add(currentPlayer === 1 ? 'black-stone' : 'white-stone');
        
        // Calculate position for the stone relative to the game-board
        // Each cell is 30px, stone is 26px, so 2px offset from cell edge
        const stoneOffset = (30 - 26) / 2; 
        stone.style.left = `${col * 30 + stoneOffset}px`;
        stone.style.top = `${row * 30 + stoneOffset}px`;
        gameBoard.appendChild(stone);

        if (checkWin(row, col)) {
            isGameOver = true;
            gameInfo.textContent = `${currentPlayer === 1 ? '흑돌' : '백돌'}의 승리!`;
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            gameInfo.textContent = `${currentPlayer === 1 ? '흑돌' : '백돌'}의 차례입니다.`;
        }
    });

    resetButton.addEventListener('click', initGame);

    // Initial game setup
    initGame();
});

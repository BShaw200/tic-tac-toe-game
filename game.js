class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('current-player');
        this.gameResultElement = document.getElementById('game-result');
        this.resetButton = document.getElementById('reset-button');
        
        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updateDisplay();
    }

    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        this.board[index] = this.currentPlayer;
        this.updateCell(index);
        
        if (this.checkWinner()) {
            this.gameActive = false;
            this.gameResultElement.textContent = `Tic-Tac-Toe Player ${this.currentPlayer === 'X' ? '1' : '2'} Wins`;
            this.gameResultElement.className = 'win';
            this.highlightWinningCells();
            this.disableAllCells();
        } else if (this.checkDraw()) {
            this.gameActive = false;
            this.gameResultElement.textContent = 'Draw';
            this.gameResultElement.className = 'draw';
            this.disableAllCells();
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateDisplay();
        }
    }

    updateCell(index) {
        const cell = this.cells[index];
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
    }

    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningCombination = combination;
                return true;
            }
            return false;
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    highlightWinningCells() {
        if (this.winningCombination) {
            this.winningCombination.forEach(index => {
                this.cells[index].classList.add('winner');
            });
        }
    }

    disableAllCells() {
        this.cells.forEach(cell => {
            cell.classList.add('disabled');
        });
    }

    updateDisplay() {
        if (this.gameActive) {
            const playerNumber = this.currentPlayer === 'X' ? '1' : '2';
            this.currentPlayerElement.textContent = `Player ${playerNumber}'s Turn (${this.currentPlayer})`;
        }
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombination = null;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.gameResultElement.textContent = '';
        this.gameResultElement.className = '';
        this.updateDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
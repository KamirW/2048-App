import { Board } from './AnimatedTile';

export const GameLogic = {
  initializeBoard(): Board {
    const newBoard: Board = Array(4).fill(null).map(() => Array(4).fill(null));
    this.addNewTile(newBoard);
    this.addNewTile(newBoard);
    return newBoard;
  },

  addNewTile(board: Board): [boolean, string?] {
    const emptyCells: [number, number][] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === null) {
          emptyCells.push([i, j]);
        }
      }
    }
    
    if (emptyCells.length === 0) return [false];
    
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
    return [true, `${row}-${col}-${board[row][col]}`];
  },

  moveLeft(board: Board): [Board, number] {
    let newScore = 0;
    const newBoard = board.map(row => {
      const filtered = row.filter(cell => cell !== null);
      const merged: (number | null)[] = [];
      let i = 0;
      
      while (i < filtered.length) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i]! * 2);
          newScore += filtered[i]! * 2;
          i += 2;
        } else {
          merged.push(filtered[i]);
          i++;
        }
      }
      
      while (merged.length < 4) {
        merged.push(null);
      }
      
      return merged;
    });
    
    return [newBoard, newScore];
  },

  rotateBoard(board: Board): Board {
    const newBoard: Board = Array(4).fill(null).map(() => Array(4).fill(null));
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newBoard[j][3 - i] = board[i][j];
      }
    }
    return newBoard;
  },

  canMove(board: Board): boolean {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === null) return true;
      }
    }
    
    // Check for possible merges
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const current = board[i][j];
        if (
          (i < 3 && board[i + 1][j] === current) ||
          (j < 3 && board[i][j + 1] === current)
        ) {
          return true;
        }
      }
    }
    
    return false;
  },

  boardToTiles(board: Board) {
    const tiles = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] !== null) {
          tiles.push({
            row,
            col,
            value: board[row][col],
            id: `${row}-${col}-${board[row][col]}`,
          });
        }
      }
    }
    return tiles;
  }
};

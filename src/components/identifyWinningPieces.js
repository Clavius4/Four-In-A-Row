/* eslint-disable prettier/prettier */
const identifyWinningPieces = (map, player) => {
  const winningPieces = [];
  // Check for horizontal wins
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length - 3; col++) {
      if (
        map[row][col] === player &&
        map[row][col + 1] === player &&
        map[row][col + 2] === player &&
        map[row][col + 3] === player
      ) {
        for (let i = 0; i < 4; i++) {
          winningPieces.push({row, col: col + i, style: {borderColor: 'red'}});
        }
      }
    }
  }
  // Check for vertical wins
  for (let row = 0; row < map.length - 3; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (
        map[row][col] === player &&
        map[row + 1][col] === player &&
        map[row + 2][col] === player &&
        map[row + 3][col] === player
      ) {
        for (let i = 0; i < 4; i++) {
          winningPieces.push({row: row + i, col, style: {borderColor: 'red'}});
        }
      }
    }
  }
  // Check for diagonal wins (from top-left to bottom-right)
  for (let row = 0; row < map.length - 3; row++) {
    for (let col = 0; col < map[row].length - 3; col++) {
      if (
        map[row][col] === player &&
        map[row + 1][col + 1] === player &&
        map[row + 2][col + 2] === player &&
        map[row + 3][col + 3] === player
      ) {
        for (let i = 0; i < 4; i++) {
          winningPieces.push({
            row: row + i,
            col: col + i,
            style: {borderColor: 'red'},
          });
        }
      }
    }
  }

  // Check for diagonal wins (from top-right to bottom-left)
  for (let row = 0; row < map.length - 3; row++) {
    for (let col = 3; col < map[row].length; col++) {
      if (
        map[row][col] === player &&
        map[row + 1][col - 1] === player &&
        map[row + 2][col - 2] === player &&
        map[row + 3][col - 3] === player
      ) {
        for (let i = 0; i < 4; i++) {
          winningPieces.push({
            row: row + i,
            col: col - i,
            style: {borderColor: 'red'},
          });
        }
      }
    }
  }
  return winningPieces;
};
export default identifyWinningPieces;

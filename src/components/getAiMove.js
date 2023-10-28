/* eslint-disable prettier/prettier */
import checkForWin from './checkForWin';

const getAiMove = (map,Level,aiPlayer) => {
  const availableColumns = [];
  // Collect available columns
  for (let columnIndex = 0; columnIndex < map[0].length; columnIndex++) {
    if (!map[0][columnIndex]) {
      availableColumns.push(columnIndex);
    }
  }
  let maxDepth;
  if (Level === 'Easy') {
    maxDepth = 3;
  } else if (Level === 'Medium') {
    maxDepth = 4;
  } else if (Level === 'Hard') {
    maxDepth = 5;
  }


  const validMoves = generateValidMoves([...map]);
  // console.log(availableColumns);
  let bestMove = null;
  let bestScore = -10000;
  for (const move of validMoves) {
    // Create a copy of the game board to simulate moves
    const newMap = simulateMove([...map], move, '0');
    const score = minimax([...newMap], maxDepth, true, -Infinity, Infinity, '0');

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
};

const simulateMove = (map, move, AI_PIECE) => {
  const newMap = map.map(row => [...row]);
  for (let row = newMap.length - 1; row >= 0; row--) {
    if (!newMap[row][move]) {
      newMap[row][move] = AI_PIECE;
      return newMap;
    }
  }
  return newMap;
};
function generateValidMoves(board) {
  const validMoves = [];
  for (let col = 0; col < board[0].length; col++) {
    if (board[0][col] === '') {
      validMoves.push(col);
    }
  }
  return validMoves;
}
function minimax (map, depth, maximizingPlayer, alpha, beta, aiPlayer) {
  const aiwon = checkForWin([...map],'0');
  const youwon = checkForWin([...map],'x');
  const validColumns = generateValidMoves([...map]);
  if (depth === 0 || youwon || aiwon || validColumns.length === 0) {
    if (youwon || aiwon || validColumns.length === 0)
    {
      if (aiwon){
        return 1000000000;
       }
       else if (youwon){
        return -100000000;
       }
       else {
        return 0;
       }
    }
  }
  else {
    return score_position([...map],aiPlayer);
  }

  if (maximizingPlayer) {
    let maxScore = -Infinity;
    const availableColumns = generateValidMoves([...map]);

    for (const col of availableColumns) {
      const newMap = simulateMove([...map], col, aiPlayer);
      const score = minimax([...newMap], depth - 1, false, alpha, beta, aiPlayer);
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, maxScore);

      if (beta <= alpha) {
        break;
      }
    }
    return maxScore;

  } else {
    let minScore = Infinity;
    const availableColumns = generateValidMoves([...map]);

    for (const col of availableColumns) {
      const newMap = simulateMove([...map], col, getOpponentPlayer(aiPlayer));
      const score = minimax([...newMap], depth - 1, true, alpha, beta, aiPlayer);
      minScore = Math.min(minScore, score);
      beta = Math.min(beta, minScore);
      if (beta <= alpha) {
        break;
      }
    }

    return minScore;
  }
}
function evaluate_window(window,piece)
{
  let opp_piece = getOpponentPlayer(piece);
  let score = 0;
  if (window.filter(item => item === piece).length === 4) {
    score += 100;
  } else if (
    window.filter(item => item === piece).length === 3 &&
    window.filter(item => item === '').length === 1
  ) {
    score += 10;
  }
  else if (
    window.filter(item => item === piece).length === 2 &&
    window.filter(item => item === '').length === 2
  ) {
    score += 5;
  }
   if (
    window.filter(item => item === opp_piece).length === 3 &&
    window.filter(item => item === '').length === 1
  ) {
    score -= 80;
  }
  else if (
    window.filter(item => item === opp_piece).length === 2 &&
    window.filter(item => item === '').length === 2
  ) {
    score -= 50;
  }
  return score;
}
function score_position(map, aiPlayer) {
  let score = 0;
  const numRows = map.length;
  const numCols = map[0].length;
  const centerColumn = Math.floor(numCols / 2); // Calculate the center column
  const centerArray = map.map(row => row[centerColumn]); // Extract the center column values
  const centerCount = centerArray.reduce((count, value) => count + (value === aiPlayer ? 1 : 0), 0); // Count the number of 'aiPlayer' in the center column
  score += centerCount * 6;

  for (let r = 0; r < map.length; r++) {
    let rowArray = map[r];
    for (let c = 0; c < map[0].length - 3; c++) {
      let window = rowArray.slice(c, c + 4);
      score += evaluate_window(window,aiPlayer);
    }
  }

  for (let c = 0; c < numCols; c++) {
    let colArray = [];
    for (let r = 0; r < numRows; r++) {
      colArray.push(map[r][c]);
    }
    for (let r = 0; r < numRows - 3; r++) {
      let window = colArray.slice(r, r + 4);
      score += evaluate_window(window,aiPlayer);
    }
  }

  for (let r = 0; r < numRows - 3; r++) {
    for (let c = 0; c < numCols - 3; c++) {
      let window = [];
      for (let i = 0; i < 4; i++) {
        window.push(map[r + i][c + i]);
      }
      score += evaluate_window(window,aiPlayer);
    }
  }

  // Evaluate diagonals from top-right to bottom-left (descending diagonals)
  for (let r = 0; r < numRows - 3; r++) {
    for (let c = numCols - 1; c >= 3; c--) {
      let window = [];
      for (let i = 0; i < 4; i++) {
        window.push(map[r + i][c - i]);
      }
      score += evaluate_window(window,aiPlayer);
    }
  }
  return score;
}
function getOpponentPlayer(player) {
  return player === 'x' ? '0' : 'x';
}
export default getAiMove;

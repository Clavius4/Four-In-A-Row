/* eslint-disable prettier/prettier */
const checkForWin = (Map, Player) => {
  // Check horizontal wins
  for (let row = 0; row < Map.length; row++) {
    for (let col = 0; col < Map[row].length - 3; col++) {
      if (
        Map[row][col] === Player &&
        Map[row][col + 1] === Player &&
        Map[row][col + 2] === Player &&
        Map[row][col + 3] === Player
      ) {
        return true;
      }
    }
  }
  // Check vertical wins
  for (let col = 0; col < Map[0].length; col++) {
    for (let row = 0; row < Map.length - 3; row++) {
      if (
        Map[row][col] === Player &&
        Map[row + 1][col] === Player &&
        Map[row + 2][col] === Player &&
        Map[row + 3][col] === Player
      ) {
        return true;
      }
    }
  }

  // Check diagonal wins (top-left to bottom-right)
  for (let row = 0; row < Map.length - 3; row++) {
    for (let col = 0; col < Map[row].length - 3; col++) {
      if (
        Map[row][col] === Player &&
        Map[row + 1][col + 1] === Player &&
        Map[row + 2][col + 2] === Player &&
        Map[row + 3][col + 3] === Player
      ) {
        return true;
      }
    }
  }
  // Check diagonal wins (top-right to bottom-left)
  for (let row = 0; row < Map.length - 3; row++) {
    for (let col = 3; col < Map[row].length; col++) {
      if (
        Map[row][col] === Player &&
        Map[row + 1][col - 1] === Player &&
        Map[row + 2][col - 2] === Player &&
        Map[row + 3][col - 3] === Player
      ) {
        return true;
      }
    }
  }
  return false; // No winner found
};
export default checkForWin;

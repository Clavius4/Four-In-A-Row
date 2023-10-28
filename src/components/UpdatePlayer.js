/* eslint-disable prettier/prettier */
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase({
  name: 'progression.db',
});
function updatePlayer(currentPlayer) {
let opponent;
if (currentPlayer === 'x')
{
    opponent = '0';
}
else {
    opponent = 'x';
}
// console.log('opponent :' + opponent);
  db.transaction(tx => {
    tx.executeSql('UPDATE Turns SET turn= ?',[opponent]);
  });
}
export default updatePlayer;

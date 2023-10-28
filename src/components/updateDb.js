/* eslint-disable prettier/prettier */
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase({
  name: 'progression.db',
});
function updateDb(status, time) {
  if (status === 'LOSE') {
    db.transaction(tx => {
      tx.executeSql('UPDATE playerData SET lost = lost+1');
    });
  } else if (status === 'WIN') {
    db.transaction(tx => {
      tx.executeSql('UPDATE playerData SET won = won+1');
    });
  }
  else if (status === 'DRAW') {
    db.transaction(tx => {
      tx.executeSql('UPDATE playerData SET tie = tie+1');
    });
  }
  db.transaction(tx => {
    tx.executeSql('UPDATE playerData SET played = played+1');
  });
  db.transaction(tx => {
    tx.executeSql('UPDATE playerData SET timePlayed = timePlayed+?',[time]);
  });
  db.transaction(tx => {
    tx.executeSql('SELECT minTime FROM playerData', [], (_, result) => {
      const rows = result.rows;
      const MinTime = rows.item(0).minTime;
      if (time < MinTime) {
        db.transaction(ts => {
          ts.executeSql('UPDATE playerData SET minTime=?',[time]);
        });
      }
    });
  });
}
export default updateDb;

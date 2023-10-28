/* eslint-disable prettier/prettier */
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase({
  name: 'progression.db',
});

function SaveTheme(icon) {
    console.log(icon);
 if (icon === 1){
    db.transaction(tx => {
        tx.executeSql(
          'UPDATE BoardTheme SET Board = ?',
          ['boardone'],
          (_, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              console.log('Database update successful');
              // Additional logic or state updates after a successful update
            } else {
              console.log('No rows were affected');
              // Additional logic or error handling if needed
            }
          },
          (_, error) => {
            console.error('Error updating database:', error);
            // Additional error handling if needed
          }
        );
      });
 }
  else if (icon === 2){
    db.transaction(tx => {
        tx.executeSql(
          'UPDATE BoardTheme SET Board = ?',
          ['boardtwo'],
          (_, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              console.log('Database update successful');
              // Additional logic or state updates after a successful update
            } else {
              console.log('No rows were affected');
              // Additional logic or error handling if needed
            }
          },
          (_, error) => {
            console.error('Error updating database:', error);
            // Additional error handling if needed
          }
        );
      });
  }
else if (icon === 3){
    db.transaction(tx => {
        tx.executeSql(
          'UPDATE BoardTheme SET Board = ?',
          ['boardthree'],
          (_, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              console.log('Database update successful');
              // Additional logic or state updates after a successful update
            } else {
              console.log('No rows were affected');
              // Additional logic or error handling if needed
            }
          },
          (_, error) => {
            console.error('Error updating database:', error);
            // Additional error handling if needed
          }
        );
      });
}
}
export default SaveTheme;

/* eslint-disable prettier/prettier */
import SQLite from 'react-native-sqlite-2';

const DatabaseService = () => {
  const db = SQLite.openDatabase('progression.db');
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS playerData (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            played INTEGER DEFAULT 0,
            won INTEGER DEFAULT 0,
            lost INTEGER DEFAULT 0,
            tie INTEGER DEFAULT 0,
            timePlayed INTEGER DEFAULT 0,
            minTime INTEGER DEFAULT 86400
          )`,
    );
  });
  db.transaction(tx =>{
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS BoardTheme(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              Board TEXT DEFAULT 'defaultBoard',
              pieceOne TEXT DEFAULT 'greenPiece',
              pieceTwo TEXT DEFAULT 'redPIece'
            )`,
      );
  });
  db.transaction(tx =>{
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Turns(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              turn TEXT DEFAULT 'x'
            )`,
      );
  });
  db.transaction(tx =>{
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Subscription(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              isSubscribed INTEGER DEFAULT 0
            )`,
      );
  });

  const isTableEmpty = (tableName: string, callback: {(isEmpty: any): void; (arg0: boolean): void},) => {
    db.transaction(tx => {
      // Define the SELECT query to count rows in the table
      const countQuery = `SELECT COUNT(*) as count FROM ${tableName}`;
      tx.executeSql(
        countQuery,
        [],
        (_, results) => {
          const rowCount = results.rows.item(0).count;
          // Call the callback with a boolean indicating if the table is empty
          callback(rowCount === 0);
        },
        (_, error) => {
          console.error('Error:', error);
          callback(false); // Assume non-empty or an error occurred
          return true; // Ensure this callback returns a boolean value
        },
      );
    });
  };

  const insertDataIfTableIsEmptyInPlayerDataTable = () => {
    isTableEmpty('playerData', (isEmpty: any) => {
      if (isEmpty) {
        // The table is empty, insert data here
        db.transaction(tx => {
          // Define the INSERT query with your data
          const insertQuery = `
            INSERT INTO playerData (played, won, lost, tie,timePlayed,mintime)
            VALUES (0, 0, 0, 0,0,86400)`;

          tx.executeSql(
            insertQuery,
            [],
            (_, results) => {
              console.log('Data inserted successfully into playerData.', results);
            },
            (_, error) => {
              console.error('Error:', error);
              return true; // Ensure this callback returns a boolean value
            },
          );
        });
      } else {
        // console.log('Table playerData is not empty. Data not inserted.');
      }
    });
  };

  const insertDataIfTableIsEmptyInGamethemeTable = () => {
    isTableEmpty('BoardTheme', (isEmpty: any) => {
      if (isEmpty) {
        // The table is empty, insert data here
        db.transaction(tx => {
          // Define the INSERT query with your data
          const insertQuery = `INSERT INTO BoardTheme(Board,pieceOne,pieceTwo)
            VALUES ('boardone','greenpiece','redpiece')`;
          tx.executeSql(insertQuery,[],(_, results) => {
              console.log('Data inserted successfully into BoardTheme', results);
            },
            (_, error) => {
              console.error('Error:', error);
              return true; // Ensure this callback returns a boolean value
            },
          );
        });
      } else {
        //console.log('Table  BoardTheme is not empty. Data not inserted.');
      }
    });
  };
  const insertDataIfTableIsEmptyInTurnsTable = () => {
    isTableEmpty('Turns', (isEmpty: any) => {
      if (isEmpty) {
        // The table is empty, insert data here
        db.transaction(tx => {
          // Define the INSERT query with your data
          const insertQuery = `INSERT INTO Turns(turn)
            VALUES ('x')`;
          tx.executeSql(insertQuery,[],(_, results) => {
              console.log('Data inserted successfully into Turns', results);
            },
            (_, error) => {
              console.error('Error:', error);
              return true; // Ensure this callback returns a boolean value
            },
          );
        });
      } else {
        //console.log('Table  BoardTheme is not empty. Data not inserted.');
      }
    });
  };
  const insertDataIfTableIsEmptyInSubscriptionTable = () => {
    isTableEmpty('Subscription', (isEmpty: any) => {
      if (isEmpty) {
        // The table is empty, insert data here
        db.transaction(tx => {
          // Define the INSERT query with your data
          const insertQuery = `INSERT INTO Subscription(isSubscribed)
            VALUES (0)`;
          tx.executeSql(insertQuery,[],(_, results) => {
              console.log('Data inserted successfully into subscription', results);
            },
            (_, error) => {
              console.error('Error:', error);
              return true; // Ensure this callback returns a boolean value
            },
          );
        });
      } else {
        //console.log('Table  BoardTheme is not empty. Data not inserted.');
      }
    });
  };
  insertDataIfTableIsEmptyInPlayerDataTable();
  insertDataIfTableIsEmptyInGamethemeTable();
  insertDataIfTableIsEmptyInTurnsTable();
  insertDataIfTableIsEmptyInSubscriptionTable();
};

export default DatabaseService;

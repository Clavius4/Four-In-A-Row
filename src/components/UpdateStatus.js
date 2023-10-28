/* eslint-disable prettier/prettier */
// import Purchases from 'react-native-purchases';
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase({
  name: 'progression.db',
});
// const checkSubscription = async () => {
//   try {
//     const purchaseInfo = await Purchases.getPurchaserInfo();
//     if (typeof purchaseInfo.entitlements.active !== 'undefined') {
//       return 1;
//     } else {
//       return 0;
//     }
//   } catch (e) {
//     return 0;
//   }
// };
function UpdateStatus(status) {
  // console.log('opponent :' + opponent);
  // const newstatus = checkSubscription();
  db.transaction(tx => {
    tx.executeSql('UPDATE subscription SET isSubscribed= ?', [status]);
  });
  // if (newstatus === 1) {
  //   db.transaction(tx => {
  //     tx.executeSql('UPDATE subscription SET isSubscribed= ?', [newstatus]);
  //   });
  // }
  // else if (newstatus){
  //   db.transaction(tx => {
  //     tx.executeSql('UPDATE subscription SET isSubscribed= ?', [newstatus]);
  //   });
  // }
}
export default UpdateStatus;

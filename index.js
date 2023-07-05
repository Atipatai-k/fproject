const admin = require('firebase-admin');// ดึงข้อมูลบัญชีบริการ
const serviceAccount = require('./serviceAccountKey.json');// กำหนดค่าโปรเจ็กต์ Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://project-app-2fcd6-default-rtdb.firebaseio.com/'// ระบุ URL ของ Firebase Realtime Database
});// เพิ่มข้อมูลใน Realtime Database

const database = admin.database();
const humidityRef = database.ref('Con/');
// ระบุเส้นทางที่ต้องการเพิ่มข้อมูล
const moment = require('moment-timezone');
// const humidityRef2 = database.ref('Controller/');
// databaseRef.once('value')
//   .then((snapshot) => {
//     const data = snapshot.val();
//     console.log('Data:', data);
//   });
function addHumidity() {
  const currentHumidity = "33";
  const timestamp = Date.now();

  const newHumidityRef = humidityRef.push();
  newHumidityRef.set({
    value: currentHumidity,
    hours: timestamp,
  });

  console.log('ค่าความชื้นถูกเพิ่มลงใน Firebase Realtime Database');
}
addHumidity();
setInterval(addHumidity, 1 * 60 * 1000); // หน่วงเวลาทุก 1 ชั่วโมง

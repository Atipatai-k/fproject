const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://project-app-2fcd6-default-rtdb.firebaseio.com/'
});

const high = require('./fcnnoti/fcnnoti_high');
const low = require('./fcnnoti/fcnnoti_low');
const error = require('./fcnnoti/fcnnoti_error');

const database = admin.database();
for (let id = 1; id < 20; id++) {
    function checkhumidity(id) {
        const otherNodeRef = database.ref('Controller/' + id);
        otherNodeRef.once('value').then((snapshot) => {
            const humi1 = snapshot.child('Humidity1').val();
            const humi2 = snapshot.child('Humidity2').val();
            const nless = snapshot.child('Nonti-less').val();
            const nmore = snapshot.child('Nonti-more').val();
            const _humi1 = parseFloat(humi1);
            const _humi2 = parseFloat(humi2);
            const _nless = parseFloat(nless);
            const _nmore = parseFloat(nmore);
            if ((_humi1 && _humi2) <= _nless && (_humi1 && _humi2) >= 0) {
                low.sendmessagelow(id);
                console.log("ค่าความชื้นต่ำ" + id);
            } else if ((_humi1 && _humi2) >= _nmore && (_humi1 && _humi2) <= 100) {
                high.sendmessagehigh(id);
                console.log("ค่าความชื้นสูง" + id);
            } else if (_humi1 > 100 || _humi2 > 100) {
                error.sendmessagerror(id);
                console.log("เกิดข้อผิดพลาด" + id);
            }
            else if (_humi1 < 0 || _humi2 < 0) {
                error.sendmessagerror(id);
                console.log("เกิดข้อผิดพลาด" + id);
            }
            else {
                console.log("ปกติ");
            }
        });
        return id;
    }
    function addHumidity(id) {
        const humidityRef = database.ref('statistics/' + id);
        const otherNodeRef = database.ref('Controller/' + id);
        otherNodeRef.once('value').then((snapshot) => {
            const Humidity = snapshot.child('Humidity1').val();
            const Humidity2 = snapshot.child('Humidity2').val();
            const date = new Date();
            const hours = date.getHours();
            const humiset = humidityRef.push();
            humiset.set({
                humi1: Humidity,
                humi2: Humidity2,
                time: hours,
            });
        });
        return id;
    }
    function deleteHumidity(id) {
        const humidityRef = database.ref('statistics/' + id);
        humidityRef.once('value')
            .then((snapshot) => {
                const firstChildKey = Object.keys(snapshot.val())[0];
                humidityRef.child(firstChildKey).remove()
            })
        return id;
    }
    module.exports = {
        checkhumidity,
        addHumidity,
        deleteHumidity,
    };
}


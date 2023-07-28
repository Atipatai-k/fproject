const admin = require('firebase-admin');
const check = require('./fcn_checkhumi');

const database = admin.database();
const humidityRef = database.ref('Controller');
humidityRef.once('value')
    .then((snapshot) => {
        const number = Object.keys(snapshot.val()).length;
        for (let i = 1; i <= number; i++) {
            check.addHumidity(i);
            check.deleteHumidity(i);
            check.checkhumidity(i);

            setInterval(() => {
                check.addHumidity(i);
            }, 60 * 60 * 1000); //36m 1h

            setInterval(() => {
                check.deleteHumidity(i);
            }, 60 * 60 * 1000);// 36m 1h

            setInterval(() => {
                check.checkhumidity(i);
            }, 300 * 1000); //300k 5 min
        }
    })

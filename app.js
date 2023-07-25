const admin = require('firebase-admin');
const check = require('./fcn_checkhumi');

const database = admin.database();
const humidityRef = database.ref('statistics');
humidityRef.once('value')
    .then((snapshot) => {
        const number = Object.keys(snapshot.val()).length;
        for (let i = 1; i <= number; i++) {
            check.addHumidity(i);
            check.deleteHumidity(i);
            check.checkhumidity(i);
            setInterval(check.addHumidity, 60 * 60 * 1000);
            setInterval(check.deleteHumidity, 60 * 60 * 1000);
            setInterval(check.checkhumidity, 5 * 60 * 1000);
        }
    })

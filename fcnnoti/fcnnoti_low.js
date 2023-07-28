const admin = require('firebase-admin');
const database = admin.database();

function sendmessagelow(id) {
    const otherNodeRef = database.ref('Controller/' + id);
    const tk = database.ref('token/token');
    otherNodeRef.once('value').then(() => {
        tk.once('value').then((snapshot) => {
            const toke = snapshot.val()
        const message = {
            notification: {
                title: 'แจ้งเตือนค่าความชื้น Con_' + id + ' ในดินต่ำ',
                body: 'ค่าความชื้นในดิน Con_' + id + ' ต่ำเกินกรุณา เปิดน้ำ.'
            },
            token: toke
        };
        admin.messaging().send(message);
        })
    })
    return id;
}
module.exports = {
    sendmessagelow,
};




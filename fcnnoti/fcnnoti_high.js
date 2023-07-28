const admin = require('firebase-admin');
const database = admin.database();

function sendmessagehigh(id) {
    const otherNodeRef = database.ref('Controller/' + id);
    const tk = database.ref('token/token');
    otherNodeRef.once('value').then(() => {
        tk.once('value').then((snapshot) => {
            const toke = snapshot.val()
            const message = {
                notification: {
                    title: 'แจ้งเตือนค่าความชื้น Con_' + id + ' ในดินสูง',
                    body: 'ค่าความชื้นในดิน Con_' + id + ' ต่ำเกินกรุณา ปิดน้ำ.'
                },
                token: toke
            };
            admin.messaging().send(message);
        })
    })
    return id;
}
module.exports = {
    sendmessagehigh,
};

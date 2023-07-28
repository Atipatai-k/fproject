const admin = require('firebase-admin');
const database = admin.database();

function sendmessagerror(id) {
    const otherNodeRef = database.ref('Controller/' + id);
    const tk = database.ref('token/token');
    otherNodeRef.once('value').then(() => {
        tk.once('value').then((snapshot) => {
            const toke = snapshot.val()
            const message = {
                notification: {
                    title: 'แจ้งเตือนเกิดข้อผิดพลาด Con_' + id,
                    body: 'เกิดข้อผิดพลาดในระบบกรุณาตรวจสอบ Con_' + id,
                },
                token: toke
            };
            admin.messaging().send(message);
        })
    })
    return id;
}
module.exports = {
    sendmessagerror,
};

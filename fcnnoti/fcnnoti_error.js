const admin = require('firebase-admin');
const registrationToken = 'dipwbT6dSRezrif8J9Wojs:APA91bF2pZczfHyr02_p3St0UsAzJhJKAK10V3y6qhGiUYcVb0LAfSH99qtbvQA_bORph3bDAf8S5vHudikDrNLh8u5whLedQYRQlFte1BHPHDF106-x7S_8tqAih38LrTKNfwutM3JL';
const database = admin.database();

    function sendmessagerror(id) {
        const otherNodeRef = database.ref('Controller/' + id);
        otherNodeRef.once('value').then(() => {
            const message = {
                notification: {
                    title: 'แจ้งเตือนเกิดข้อผิดพลาด Con_' + id,
                    body: 'เกิดข้อผิดพลาดในระบบกรุณาตรวจสอบ Con_' + id,
                },
                token: registrationToken
            };
            admin.messaging().send(message);
        })
        return id;
    }
    module.exports = {
        sendmessagerror,
    };
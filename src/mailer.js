<<<<<<< HEAD
const express = require('express');
const nodemailer = require('nodemailer');

// const createTrans = () => {
//     const transport = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: 'exploced@gmail.com', // generated ethereal user
//             pass: 'fowjmihpqxqshpqf', // generated ethereal password
//         },
//     });
//     return transport
// }

const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'kenkoshokuhinpage9@gmail.com', // generated ethereal user
            pass: 'eomuauahjfihcbnn', // generated ethereal password
        },
    });
    return transport
}


const sendMail = async (email) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Healthyfood" <kenkoshokuhinpage9@gmail.com>',
        to: [email],
        subject: 'Bienvenido a Healthyfood!!',
        html: "<br>Bienvenido a Healthyfood<br>"
    });
    console.log("Message sent: %s", info.messageId);
    console.log('---------------------------------------')
}

module.exports = sendMail;

    // exports.sendMail = () => sendMail()
=======
const express = require('express');
const nodemailer = require('nodemailer');

// const createTrans = () => {
//     const transport = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: 'exploced@gmail.com', // generated ethereal user
//             pass: 'fowjmihpqxqshpqf', // generated ethereal password
//         },
//     });
//     return transport
// }

const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'kenkoshokuhinpage9@gmail.com', // generated ethereal user
            pass: 'eomuauahjfihcbnn', // generated ethereal password
        },
    });
    return transport
}


const sendMail = async (email) => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Healthyfood" <kenkoshokuhinpage9@gmail.com>',
        to: [email],
        subject: 'Bienvenido a Healthyfood!!',
        html: "<br>Bienvenido a Healthyfood<br>"
    });
    console.log("Message sent: %s", info.messageId);
    console.log('---------------------------------------')
}

module.exports = sendMail;

    // exports.sendMail = () => sendMail()
>>>>>>> 2772ec34df411192a5976936a63c4a06e9930022

const express = require('express');
const router = express.Router();
const { smtpTransport } = require("../config/email");
require('dotenv').config();
const env = process.env;




router.post('/notify', async (req, res, next) => {
    try {
        console.log(1);
        const sendEmail = req.body.email;
        console.log(sendEmail);
        console.log(5);

        const number = generateRandom(111111, 999999);
        const mailOptions = {
            from: env.FROM_EMAIL,
            to: sendEmail,
            subject: "학교 인증매일입니다.",
            text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
        };
        console.log(2);
        const auth = smtpTransport.sendMail(mailOptions);
        try {
            smtpTransport.close();
            return res.status(200).json({ number: number });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'fail' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "code": 500 });
    }
});

var generateRandom = function (min, max) {
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
}

module.exports = router;
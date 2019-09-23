'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs');
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    // console.log(testAccount);
    // create reusable transporter object using the default SMTP transport
    const config = {
        user: '2513433408@qq.com',
        pass: 'jqyfxghdxmugeadh',
        to: 'asaka.z@lifebyte.io'
    }
    const file = await fs.readFileSync('./template.html', 'utf-8');
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: config.user, // qq邮箱
            pass: config.pass // 授权码
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: config.user, // 发送人
        to: config.to, // 接收邮箱
        subject: 'Test Email', // 主题
        text: 'Hello world?', // plain text body
        html: file // html body
    });

    console.log('Message sent: %s', info);

}

main().catch(console.error);

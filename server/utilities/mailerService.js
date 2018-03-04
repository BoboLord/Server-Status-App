'use strict';
const nodemailer = require('nodemailer');

/**
 * Ping port with opts.
  failure.
 */
function sendMail(receiver) {
  let mailOptions = {
    from: '"Obsidian Admin 👻" <cjw6dkwmdqrkrbsb@ethereal.email>',
    to: receiver + ', obsidianmailer@gmail.com',
    subject: 'Email Confirmation',
    text: 'Please click the link below to activate your account and start using it',
    html: '<b>Thanks for registering with Obsidian Server. Please click the link below to' +
      ' activate your account and start using it < /b>'
  };

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'cjw6dkwmdqrkrbsb@ethereal.email',
      pass: 'bGMJzsD2smNqG14XsB'
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

exports.sendMail = sendMail;

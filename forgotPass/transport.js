const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS_GMAIL,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;

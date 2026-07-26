const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.Email_Host,
    port: process.env.Email_Port,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
      user: process.env.Email_Username,
      pass: process.env.Email_Username,
    },
  });

  await transporter.sendMail({
    from: 'mohamed abdalkareem <momo>', // sender address
    to: options.to, // list of recipients
    subject: options.subject, // subject line
    text: options.text, // plain text body
    // html: '<b>Hello world?</b>', // HTML body
  });
};

module.exports = sendEmail;

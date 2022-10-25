const mail = require('nodemailer');

const SendEmail = (email, subject, message) => {
  const transporter = mail.createTransport({
    service: 'gmail',
    auth: {
      user: 'hmp9304@gmail.com',
      pass: 'hesammp776'
    }
  });

  const Options = {
    from: 'hmp9304@gmail.com',
    to: email,
    subject: subject,
    text: String(message)
  };

  transporter.sendMail(Options, (error, info) => {
    if (error != null) {
      console.log('error');
    }
  });
}

module.exports = {SendEmail}

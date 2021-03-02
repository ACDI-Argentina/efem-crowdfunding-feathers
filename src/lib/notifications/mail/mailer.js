const nodemailer = require("nodemailer");
const {
  host,
  port,
  username,
  password
} = require("../../../../config/mail/mail");

const mailer = nodemailer.createTransport({
  host,
  port,
  secure: true,
  auth: {
    user: username,
    pass: password,
  },
});

function sendMail({ to, subject, text, html }) {

  return mailer.sendMail({
    from: '"Give 4 Forest" <give4forest@acdi.org.ar>',
    to,
    subject,
    text,
    html
  });
}

module.exports = sendMail;


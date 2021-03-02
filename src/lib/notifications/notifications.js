const { SecretCode } = require('../../models/secretCode');
const sendMail = require('./mail/mailer');
const { activationMail } = require('./mail/compose');

// TODO write a hook to prevent overwriting a non-zero giverId with 0
// Quizás podamos crear un mail service, y emitir eventos cuando los emails se hayan enviado efectivamente
const sendConfirmationMail = async context => {
  try {
    const userId = context.id;
    const { name, email } = context.data;

    if (email) {
      const activationCode = Math.floor(Math.random() * 1000000).toString();
      const secretCode = new SecretCode({
        code: activationCode,
        user: userId,
      });
      await secretCode.save();
      const activationPath = `/email-validation/?user=${userId}&code=${activationCode}`;

      const user = {
        address: userId,
        name,
      };

      await sendMail({
        to: email,
        subject: `Welcome to Give4Forests, ${name}!`,
        html: activationMail({ user, activationPath, activationCode }),
      });
      console.log(`Activation email sended to: ${email}`);
      
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendConfirmationMail,
};

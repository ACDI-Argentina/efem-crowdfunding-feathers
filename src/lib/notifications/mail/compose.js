//const server = "https://beta.give4forest.org"; //TODO: leer desde el env
const server = "http://localhost:3030"

const activationMail =({user,activationPath,activationCode}) => (
  `<div>
    ${user.name}, Welcome on board!
    If the address <b>${user.address}</b> is yours, please validate your email address with the following link:
      <div> 
        <a href="${server}${activationPath}"> Validate Email </a>
      </div>
      <div>
        Or if you wish you can use the following code: <b>${activationCode}</b>.
      </div>
      <div>
        From your account panel, you can subscribe to events on dacs or campaigns that you support,
      </div>
      <div>
        Regards
      </div>
      <div>
        Give 4 Forest Team
      </div>
  </div>`
  );


module.exports = {
    activationMail
}
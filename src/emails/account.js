const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeMail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "sakshamk88@gmail.com",
      subject: "Congrats! You are now a part of the community!",
      text: `Welcome to the group, ${name}. Let me know about your needs`,
    })
    .then(() => {})
    .catch((error) => {
      console.log(error.response.body.errors[1]);
    });
};

const sendCancelationMail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "sakshamk88@gmail.com",
      subject: "Account Deletion Alert!",
      text: `Hey ${name}, we see that you have deleted your account. We hope that you had a good time.Please let us know on what we can improve on.
      If it not you who deleted the account please notify us by replying to this email!`,
    })
    .then(() => {})
    .catch((error) => {
      console.log(error.response.body.errors[1]);
    });
};

module.exports = {
  sendWelcomeMail,
  sendCancelationMail,
};

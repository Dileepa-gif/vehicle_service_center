const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vehicleservicecenterfct@gmail.com',
    pass: 'devindi@12345'
  }
});

exports.emailSender = async function (user,randomPassword) {
  transport
    .sendMail({
      from: "vehicleservicecenterfct@gmail.com",
      to: user.email,
      subject: "Welcome to Vehicle Service Center!",
      html: `<h1><b>Hello ${user.name} !</b></h1>

                <h4><i>You're on your way!</i></h4>
                <h5>Let's update your Employee account</h5><br>
                <p><b>Email : </b>${user.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>
                <p>Please click <a href="${process.env.BASE_URL}/employee/getAllEmployees">hear</a> to login into your account </p>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " for account verification");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " for account verification"
      );
    });
};


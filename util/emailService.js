const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vehicleservicecenterfct@gmail.com',
    // pass: 'devindi@12345'
    pass: 'eipgjtrhnlexcppx'
  }
});

exports.employeePasswordSender = async function (user,randomPassword) {
  transport
    .sendMail({
      from: "vehicleservicecenterfct@gmail.com",
      to: user.email,
      subject: "Welcome to Vehicle Service Center!",
      html: `<h1><b>Hello ${user.first_name} !</b></h1>

                <h4><i>You're on your way!</i></h4>
                <h5>Let's update your Employee Account</h5><br>
                <p><b>Email : </b>${user.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>
                <p>Please click <a href="${process.env.BASE_URL}">hear</a> to login into your account </p>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " for employee account creation.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " for employee account creation."
      );
    });
};

exports.adminPasswordSender = async function (user,randomPassword) {
  transport
    .sendMail({
      from: "vehicleservicecenterfct@gmail.com",
      to: user.email,
      subject: "Welcome to Vehicle Service Center!",
      html: `<h1><b>Hello ${user.first_name} !</b></h1>

                <h4><i>You're on your way!</i></h4>
                <h5>Let's update your Admin Account</h5><br>
                <p><b>Email : </b>${user.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>
                <p>Please click <a href="${process.env.BASE_URL}">hear</a> to login into your account </p>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " for admin account creation.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " for admin account creation."
      );
    });
};


exports.adminForgotPasswordSender = async function (user,randomPassword) {
  transport
    .sendMail({
      from: "vehicleservicecenterfct@gmail.com",
      to: user.email,
      subject: "Please  log in and update your account",
      html: `<h1><b>Hello ${user.first_name} !</b></h1>

                <h4><i>Forgot password resetting</i></h4>
                <h5>Let's log in and update your admin account by using below recovery password</h5><br>
                <p><b>Email : </b>${user.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " to reset admin password.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " to reset admin password."
      );
    });
};



exports.employeeForgotPasswordSender = async function (user,randomPassword) {
  transport
    .sendMail({
      from: "vehicleservicecenterfct@gmail.com",
      to: user.email,
      subject: "Please  log in and update your account",
      html: `<h1><b>Hello ${user.first_name} !</b></h1>

                <h4><i>Forgot password resetting</i></h4>
                <h5>Let's log in and update your employee account by using below recovery password</h5><br>
                <p><b>Email : </b>${user.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " to reset employee password.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " to reset employee password."
      );
    });
};


exports.customerForgotPasswordSender = async function (user,randomPassword) {
  transport
    .sendMail({
      from: "vehicleservicecenterfct@gmail.com",
      to: user.email,
      subject: "Please  log in and update your account",
      html: `<h1><b>Hello ${user.first_name} !</b></h1>

                <h4><i>Forgot password resetting</i></h4>
                <h5>Let's log in and update your customer account by using below recovery password</h5><br>
                <p><b>Email : </b>${user.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " to reset customer password.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " to reset customer password."
      );
    });
};




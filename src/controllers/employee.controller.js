const Employee = require("../models/employee.model");
const crypto = require("crypto");
const auth = require("../util/auth");
const { emailSender} = require("../util/emailService");

exports.register = (req, res) => {
  Employee.getEmployeeByEmail(req.body.email)
    .then(([result]) => {
      if (result.length) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "This email already registered",
        });
      } else {
        var randomPassword = Math.random().toString(36).slice(-8);
        const salt = crypto.randomBytes(32).toString("hex");
        const hash = crypto
          .pbkdf2Sync(randomPassword, salt, 10000, 64, "sha512")
          .toString("hex");
        const newEmployee = new Employee({
          name: req.body.name,
          email: req.body.email,
          hash: hash,
          salt: salt,
          nic_number: req.body.nic_number,
          phone_number: req.body.phone_number,
          address: req.body.address,
        });
        newEmployee
          .create()
          .then(([result]) => {
            if (result.affectedRows === 1) {
              const tokenObject = auth.issueJWT({
                id: result.insertId,
                ...newEmployee,
              }, "EMPLOYEE");
              emailSender(newEmployee,randomPassword);
              return res.status(200).json({
                code: 200,
                success: true,
                tokenObject: tokenObject,
                message: "Successfully registered",
              });
            } else {
              return res.status(200).json({
                code: 200,
                success: false,
                message: "Please try again",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(200).json({
              code: 200,
              success: false,
              message: error.message,
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};


exports.login = async function (req, res) {
  Employee.getEmployeeByEmail(req.body.email)
    .then(([employee]) => {
      if (employee.length) {
        var hashVerify = crypto
          .pbkdf2Sync(req.body.password, employee[0].salt, 10000, 64, "sha512")
          .toString("hex");

        if (employee[0].hash === hashVerify) {
          const tokenObject = auth.issueJWT(employee[0], "EMPLOYEE");

          res.status(200).json({
            code: 200,
            success: true,
            token: tokenObject,
          });
        } else {
          res.status(200).json({
            code: 200,
            success: false,
            message: "you entered the wrong password",
          });
        }
      } else {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "This email not registered",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};

exports.getAllEmployees = (req, res, next) => {
  Employee.getAllEmployees()
    .then(([rows]) => {
      if(rows.length){
        return res.status(200).json({
          code: 200,
          success: true,
          data: rows,
          message: "Data received",
        });
      }else{
        return res.status(200).json({
          code: 200,
          success: false,
          data: rows,
          message: "Data not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};

exports.getEmployeeById = (req, res) => {
  Employee.getEmployeeById(req.params.id)
    .then(([rows]) => {
      if(rows.length){
        return res.status(200).json({
          code: 200,
          success: true,
          data: rows,
          message: "Data received",
        });
      }else{
        return res.status(200).json({
          code: 200,
          success: false,
          data: rows,
          message: "Data not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};

exports.update = (req, res) => {
  if (parseInt(req.jwt.sub.id) !== parseInt(req.params.id)) {
    return res.status(200).json({
      code: 200,
      success: false,
      message: "You are not the owner of this account",
    });
  }
  Employee.getEmployeeById(req.params.id)
    .then(([employee]) => {
      let salt;
      let hash;
      if (req.body.password) {
        salt = crypto.randomBytes(32).toString("hex");
        hash = crypto
          .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
          .toString("hex");
      }
      if (employee.length) {
        const updatedEmployee = new Employee({
          name: req.body.name || employee[0].name,
          email: req.body.email || employee[0].email,
          hash: hash || employee[0].hash,
          salt: salt || employee[0].salt,
          nic_number: req.body.nic_number || employee[0].nic_number,
          phone_number: req.body.phone_number || employee[0].phone_number,
          address: req.body.address || employee[0].address,
        });
        updatedEmployee
          .update(req.params.id)
          .then(([result]) => {
            if (result.affectedRows === 1) {
              return res.status(200).json({
                code: 200,
                success: true,
                message: "Successfully updated",
              });
            } else {
              return res.status(200).json({
                code: 200,
                success: false,
                message: "Please try again",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(200).json({
              code: 200,
              success: false,
              message: error.message,
            });
          });
      } else {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "This customer not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};

exports.delete = (req, res) => {
  Employee.delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 1) {
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Successfully deleted",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "Please try again",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};

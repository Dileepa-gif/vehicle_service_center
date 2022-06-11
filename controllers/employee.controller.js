const Employee = require("../models/employee.model");
const crypto = require("crypto");
const auth = require("../util/auth");
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);
const {
  employeePasswordSender,
  employeeForgotPasswordSender,
} = require("../util/emailService");

const employeeRegisterValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().allow(null, ""),
    first_name: Joi.string().required().min(2).max(250),
    last_name: Joi.string().required().min(2).max(250),
    email: Joi.string().required().max(250).email(),
    nic_number: Joi.string().required().min(10).max(12),
    phone_number: Joi.string()
      .required()
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .messages({
        "string.min": "Must have at least 10 characters",
        "object.regex": "Must have at least 12 characters",
        "string.pattern.base": "Phone number should be corrected",
      }),
    address: Joi.string().required().min(2).max(250),
  });
  return schema.validate(data);
};

const employeeUpdateValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().allow(null, ""),
    first_name: Joi.string().required().min(2).max(250),
    last_name: Joi.string().required().min(2).max(250),
    email: Joi.string().required().max(250).email(),
    password: Joi.string().allow(null, "").min(8).max(25),
    nic_number: Joi.string().required().min(10).max(12),
    phone_number: Joi.string()
      .required()
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .messages({
        "string.min": "Must have at least 10 characters",
        "object.regex": "Must have at least 12 characters",
        "string.pattern.base": "Phone number should be corrected",
      }),
    address: Joi.string().required().min(2).max(250),
  });
  return schema.validate(data);
};

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
        const { error } = employeeRegisterValidation(req.body);
        if (error)
          return res.status(200).json({
            code: 200,
            success: false,
            message: error.details[0].message,
          });
        var randomPassword = Math.random().toString(36).slice(-8);
        const salt = crypto.randomBytes(32).toString("hex");
        const hash = crypto
          .pbkdf2Sync(randomPassword, salt, 10000, 64, "sha512")
          .toString("hex");
        const newEmployee = new Employee({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
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
              employeePasswordSender(newEmployee, randomPassword);
              return res.status(200).json({
                code: 200,
                success: true,
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

          return res.status(200).json({
            code: 200,
            success: true,
            message: "Successfully logged",
            tokenObject: tokenObject,
          });
        } else {
          return res.status(200).json({
            code: 200,
            success: false,
            message: "You entered a wrong password",
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

exports.passwordReset = (req, res) => {
  Employee.getEmployeeByEmail(req.body.email)
    .then(([employee]) => {
      var randomPassword = Math.random().toString(36).slice(-8);
      let salt;
      let hash;
      if (randomPassword) {
        salt = crypto.randomBytes(32).toString("hex");
        hash = crypto
          .pbkdf2Sync(randomPassword, salt, 10000, 64, "sha512")
          .toString("hex");
      }
      if (employee.length) {
        const updatedEmployee = new Employee({
          first_name: employee[0].first_name,
          last_name: employee[0].last_name,
          email: employee[0].email,
          hash: hash,
          salt: salt,
          nic_number: employee[0].nic_number,
          phone_number: employee[0].phone_number,
          address: employee[0].address,
        });
        updatedEmployee
          .update(employee[0].id)
          .then(([result]) => {
            if (result.affectedRows === 1) {
              employeeForgotPasswordSender(updatedEmployee, randomPassword);
              return res.status(200).json({
                code: 200,
                success: true,
                message: "Please check your email.",
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
          message: "This employee not found",
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
      if (rows.length) {
        return res.status(200).json({
          code: 200,
          success: true,
          data: rows,
          message: "Data received",
        });
      } else {
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
      if (rows.length) {
        return res.status(200).json({
          code: 200,
          success: true,
          data: rows,
          message: "Data received",
        });
      } else {
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

  const { error } = employeeUpdateValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });

  Employee.checkEmailForUpdating(req.params.id, req.body.email)
    .then(([rows]) => {
      if (rows.length) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "This email already registered",
        });
      } else {
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
                first_name: req.body.first_name || employee[0].first_name,
                last_name: req.body.last_name || employee[0].last_name,
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

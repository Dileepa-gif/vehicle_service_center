const Admin = require("../models/admin.model");
const crypto = require("crypto");
const auth = require("../util/auth");
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);
const { adminPasswordSender, adminForgotPasswordSender,} = require("../util/emailService");

const adminRegisterValidation = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(2).max(250),
    last_name: Joi.string().required().min(2).max(250),
    email: Joi.string().required().max(250).email(),
    password: Joi.string().required().min(8).max(25),
    nic_number: Joi.string().required().min(10).max(12),
    phone_number: Joi.string()
      .required()
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .message("Phone number should be corrected"),
    address: Joi.string().required().min(2).max(250),
  });
  return schema.validate(data);
};

const adminUpdateValidation = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(2).max(250),
    last_name: Joi.string().required().min(2).max(250),
    email: Joi.string().required().max(250).email(),
    nic_number: Joi.string().required().min(10).max(12),
    phone_number: Joi.string()
      .required()
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .message("Phone number should be corrected"),
    address: Joi.string().required().min(2).max(250),
  });
  return schema.validate(data);
};

exports.register = (req, res) => {
  Admin.getAdminByEmail(req.body.email)
    .then(([result]) => {
      if (result.length) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "This email already registered",
        });
      } else {
        const { error } = adminRegisterValidation(req.body);
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
        const newAdmin = new Admin({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          hash: hash,
          salt: salt,
          nic_number: req.body.nic_number,
          phone_number: req.body.phone_number,
          address: req.body.address,
        });
        newAdmin
          .create()
          .then(([result]) => {
            if (result.affectedRows === 1) {
              adminPasswordSender(newAdmin, randomPassword);
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
  Admin.getAdminByEmail(req.body.email)
    .then(([admin]) => {
      if (admin.length) {
        var hashVerify = crypto
          .pbkdf2Sync(req.body.password, admin[0].salt, 10000, 64, "sha512")
          .toString("hex");

        if (admin[0].hash === hashVerify) {
          const tokenObject = auth.issueJWT(admin[0], "ADMIN");
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
  Admin.getAdminByEmail(req.body.email)
    .then(([admin]) => {
      var randomPassword = Math.random().toString(36).slice(-8);
      let salt;
      let hash;
      if (randomPassword) {
        salt = crypto.randomBytes(32).toString("hex");
        hash = crypto
          .pbkdf2Sync(randomPassword, salt, 10000, 64, "sha512")
          .toString("hex");
      }
      if (admin.length) {
        const updatedAdmin = new Admin({
          first_name: admin[0].first_name,
          last_name: admin[0].last_name,
          email: admin[0].email,
          hash: hash,
          salt: salt,
          nic_number: admin[0].nic_number,
          phone_number: admin[0].phone_number,
          address: admin[0].address,
        });
        updatedAdmin
          .update(admin[0].id)
          .then(([result]) => {
            if (result.affectedRows === 1) {
              adminForgotPasswordSender(updatedAdmin, randomPassword);
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
          message: "This admin not found",
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

exports.getAllAdmins = (req, res, next) => {
  Admin.getAllAdmins()
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

exports.getAdminById = (req, res) => {
  Admin.getAdminById(req.params.id)
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

  const { error } = adminUpdateValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });

  Admin.getAdminById(req.params.id)
    .then(([admin]) => {
      let salt;
      let hash;
      if (req.body.password) {
        const { error } = adminRegisterValidation(req.body);
        if (error)
          return res.status(200).json({
            code: 200,
            success: false,
            message: error.details[0].message,
          });
        salt = crypto.randomBytes(32).toString("hex");
        hash = crypto
          .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
          .toString("hex");
      }
      if (admin.length) {
        const updatedAdmin = new Admin({
          first_name: req.body.first_name || admin[0].first_name,
          last_name: req.body.last_name || admin[0].last_name,
          email: req.body.email || admin[0].email,
          hash: hash || admin[0].hash,
          salt: salt || admin[0].salt,
          nic_number: req.body.nic_number || admin[0].nic_number,
          phone_number: req.body.phone_number || admin[0].phone_number,
          address: req.body.address || admin[0].address,
        });
        updatedAdmin
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
          message: "This admin not found",
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
  Admin.getAllAdmins()
    .then(([rows]) => {
      if (rows.length > 1) {
        Admin.delete(req.params.id)
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
      } else {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "The system must have at least one administrator",
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

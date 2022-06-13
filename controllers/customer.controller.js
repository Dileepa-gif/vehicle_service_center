const Customer = require("../models/customer.model");
const Vehicle = require("../models/vehicle.model");
const FCMToken = require("../models/fcm_toke.model");
const crypto = require("crypto");
const auth = require("../util/auth");
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);
const { customerForgotPasswordSender } = require("../util/emailService");

const customerSingUpValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(250).email(),
    password: Joi.string().required().min(8).max(25),
  });
  return schema.validate(data);
};

const customerRegisterValidation = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(2).max(250),
    last_name: Joi.string().required().min(2).max(250),
    contact_number: Joi.string()
      .required()
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .messages({
        "string.min": "Must have at least 10 characters",
        "object.regex": "Must have at least 12 characters",
        "string.pattern.base": "Phone number should be corrected",
      }),
    nic_number: Joi.string().required().min(10).max(12),
    vehicle_type: Joi.string().required().min(2).max(250),
    vehicle_number: Joi.string().required().min(4).max(8),
    fcm_token: Joi.string().required(),
  });
  return schema.validate(data);
};

const customerLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(250).email(),
    password: Joi.string().required().min(8).max(25),
    fcm_token: Joi.string().required(),
  });
  return schema.validate(data);
};

const customerUpdateValidation = (data) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(2).max(250),
    last_name: Joi.string().required().min(2).max(250),
    email: Joi.string().required().max(250).email(),
    password: Joi.string().allow(null, "").min(8).max(25),
    contact_number: Joi.string()
      .required()
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .messages({
        "string.min": "Must have at least 10 characters",
        "object.regex": "Must have at least 12 characters",
        "string.pattern.base": "Phone number should be corrected",
      }),
    nic_number: Joi.string().required().min(10).max(12),
  });
  return schema.validate(data);
};

exports.signUp = (req, res) => {
  Customer.getCustomerByEmail(req.body.email)
    .then(([result]) => {
      if (result.length) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "This email already registered",
        });
      } else {
        const { error } = customerSingUpValidation(req.body);
        if (error)
          return res.status(200).json({
            code: 200,
            success: false,
            message: error.details[0].message,
          });
        const salt = crypto.randomBytes(32).toString("hex");
        const hash = crypto
          .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
          .toString("hex");
        const newCustomer = new Customer({
          first_name: null,
          last_name: null,
          email: req.body.email,
          hash: hash,
          salt: salt,
          contact_number: null,
          nic_number: null,
          is_completed: 0,
        });
        newCustomer
          .create()
          .then(([result]) => {
            if (result.affectedRows === 1) {
              const tokenObject = auth.issueJWT(
                {
                  id: result.insertId,
                  ...newCustomer,
                },
                "CUSTOMER"
              );
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

exports.register = (req, res) => {
  if (parseInt(req.jwt.sub.id) !== parseInt(req.params.id)) {
    return res.status(200).json({
      code: 200,
      success: false,
      message: "You are not the owner of this account",
    });
  }
  Customer.getCustomerById(req.params.id)
    .then(([customer]) => {
      if (customer.length) {
        const { error } = customerRegisterValidation(req.body);
        if (error)
          return res.status(200).json({
            code: 200,
            success: false,
            message: error.details[0].message,
          });

        const updatedCustomer = new Customer({
          first_name: req.body.first_name || customer[0].first_name,
          last_name: req.body.last_name || customer[0].last_name,
          hash: customer[0].hash,
          salt: customer[0].salt,
          contact_number: req.body.contact_number || customer[0].contact_number,
          nic_number: req.body.nic_number || customer[0].nic_number,
          is_completed: 1,
        });
        updatedCustomer
          .update(req.params.id)
          .then(([result]) => {
            if (result.affectedRows === 1) {
              FCMToken.deleteByFCMToken(req.body.fcm_token)
                .then(([deletedFCMToken]) => {
                  console.log(
                    " deletedFCMToken -> affectedRows = ",
                    deletedFCMToken.affectedRows
                  );
                  const newFCMToken = new FCMToken({
                    customer_id: req.params.id,
                    fcm_token: req.body.fcm_token,
                  });

                  newFCMToken
                    .create()
                    .then(([createdFCMToken]) => {
                      console.log(
                        " createdFCMToken -> affectedRows = ",
                        createdFCMToken.affectedRows
                      );

                      const newVehicle = new Vehicle({
                        customer_id: req.params.id,
                        vehicle_type: req.body.vehicle_type,
                        vehicle_number: req.body.vehicle_number.toUpperCase(),
                      });

                      newVehicle
                        .create()
                        .then(([createdVehicle]) => {
                          if (createdVehicle.affectedRows === 1) {
                            const tokenObject = auth.issueJWT(
                              { id: req.params.id, ...updatedCustomer },
                              "CUSTOMER"
                            );
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
                    })
                    .catch((error) => {
                      console.log(error);
                      return res.status(200).json({
                        code: 200,
                        success: false,
                        message: error.message,
                      });
                    });
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

exports.login = async function (req, res) {
  const { error } = customerLoginValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });
  Customer.getCustomerByEmail(req.body.email)
    .then(([customer]) => {
      if (customer.length) {
        var hashVerify = crypto
          .pbkdf2Sync(req.body.password, customer[0].salt, 10000, 64, "sha512")
          .toString("hex");

        if (customer[0].hash === hashVerify) {
          FCMToken.deleteByFCMToken(req.body.fcm_token)
            .then(([deletedFCMToken]) => {
              console.log(
                " deletedFCMToken -> affectedRows = ",
                deletedFCMToken.affectedRows
              );
              const newFCMToken = new FCMToken({
                customer_id: customer[0].id,
                fcm_token: req.body.fcm_token,
              });

              newFCMToken
                .create()
                .then(([createdFCMToken]) => {
                  console.log(
                    " createdFCMToken -> affectedRows = ",
                    createdFCMToken.affectedRows
                  );
                  const tokenObject = auth.issueJWT(customer[0], "CUSTOMER");

                  res.status(200).json({
                    code: 200,
                    success: true,
                    token: tokenObject,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  return res.status(200).json({
                    code: 200,
                    success: false,
                    message: error.message,
                  });
                });
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
          res.status(200).json({
            code: 200,
            success: false,
            message: "you entered a wrong password",
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
  Customer.getCustomerByEmail(req.body.email)
    .then(([customer]) => {
      var randomPassword = Math.random().toString(36).slice(-8);
      let salt;
      let hash;
      if (randomPassword) {
        salt = crypto.randomBytes(32).toString("hex");
        hash = crypto
          .pbkdf2Sync(randomPassword, salt, 10000, 64, "sha512")
          .toString("hex");
      }
      if (customer.length) {
        const updatedCustomer = new Customer({
          first_name: customer[0].first_name,
          last_name: customer[0].last_name,
          email: req.body.email,
          hash: hash,
          salt: salt,
          contact_number: customer[0].contact_number,
          nic_number: customer[0].nic_number,
          is_completed: 1,
        });
        updatedCustomer
          .update(customer[0].id)
          .then(([result]) => {
            if (result.affectedRows === 1) {
              customerForgotPasswordSender(updatedCustomer, randomPassword);
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

exports.getAllCustomers = (req, res, next) => {
  Customer.getAllCustomers()
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

exports.getCustomerById = (req, res) => {
  Customer.getCustomerById(req.params.id)
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

  const { error } = customerUpdateValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });
  Customer.checkEmailForUpdating(req.params.id, req.body.email)
    .then(([rows]) => {
      if (rows.length) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "This email already registered",
        });
      } else {
        Customer.getCustomerById(req.params.id)
          .then(([customer]) => {
            let salt;
            let hash;
            if (req.body.password) {
              salt = crypto.randomBytes(32).toString("hex");
              hash = crypto
                .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
                .toString("hex");
            }
            if (customer.length) {
              const updatedCustomer = new Customer({
                first_name: req.body.first_name || customer[0].first_name,
                last_name: req.body.last_name || customer[0].last_name,
                email: req.body.email || customer[0].email,
                hash: hash || customer[0].hash,
                salt: salt || customer[0].salt,
                contact_number:
                  req.body.contact_number || customer[0].contact_number,
                nic_number: req.body.nic_number || customer[0].nic_number,
                is_completed: 1,
              });
              updatedCustomer
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
  Customer.delete(req.params.id)
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

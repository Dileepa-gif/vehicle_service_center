const Customer = require("../models/customer.model");
const crypto = require("crypto");
const auth = require("../util/auth");

exports.register = (req, res) => {
  Customer.getCustomerByEmail(req.body.email)
    .then(([result]) => {
      if (result.length) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "This email already registered",
        });
      } else {
        const salt = crypto.randomBytes(32).toString("hex");
        const hash = crypto
          .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
          .toString("hex");
        const newCustomer = new Customer({
          name: req.body.name,
          email: req.body.email,
          hash: hash,
          salt: salt,
          nic_number: req.body.nic_number,
          phone_number: req.body.phone_number,
          address: req.body.address,
        });
        newCustomer
          .create()
          .then(([result]) => {
            if (result.affectedRows === 1) {
              const tokenObject = auth.issueJWT({
                id: result.insertId,
                ...newCustomer,
              }, "CUSTOMER");
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
  Customer.getCustomerByEmail(req.body.email)
    .then(([customer]) => {
      if (customer.length) {
        var hashVerify = crypto
          .pbkdf2Sync(req.body.password, customer[0].salt, 10000, 64, "sha512")
          .toString("hex");

        if (customer[0].hash === hashVerify) {
          const tokenObject = auth.issueJWT(customer[0], "CUSTOMER");

          res.status(200).json({
            code: 200,
            success: true,
            token: tokenObject,
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

exports.getAllCustomers = (req, res, next) => {
  Customer.getAllCustomers()
    .then(([rows]) => {
      return res.status(200).json({
        code: 200,
        success: true,
        data: rows,
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
};

exports.getCustomerById = (req, res) => {
  Customer.getCustomerById(req.params.id)
    .then(([rows]) => {
      return res.status(200).json({
        code: 200,
        success: true,
        data: rows,
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
};

exports.update = (req, res) => {
  if (parseInt(req.jwt.sub.id) !== parseInt(req.params.id)) {
    return res.status(200).json({
      code: 200,
      success: false,
      message: "You are not the owner of this account",
    });
  }
  Customer.getCustomerById(req.params.id)
  .then(([customer]) => {
    let salt;
    let hash;
    if(req.body.password){
      salt = crypto.randomBytes(32).toString("hex");
      hash = crypto
          .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
          .toString("hex");
    }
    if (customer.length) {
      const updatedCustomer = new Customer({
        name: req.body.name || customer[0].name,
        email: req.body.email || customer[0].email,
        hash: hash || customer[0].hash,
        salt: salt || customer[0].salt,
        nic_number: req.body.nic_number || customer[0].nic_number,
        phone_number: req.body.phone_number || customer[0].phone_number,
        address: req.body.address || customer[0].address,
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

const Admin = require("../models/admin.model");
const crypto = require("crypto");
const auth = require("../util/auth");

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
        const salt = crypto.randomBytes(32).toString("hex");
        const hash = crypto
          .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
          .toString("hex");
        const newAdmin = new Admin({
          name: req.body.name,
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
              const tokenObject = auth.issueJWT({
                id: result.insertId,
                ...newAdmin,
              }, "ADMIN");
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
  Admin.getAdminByEmail(req.body.email)
    .then(([admin]) => {
      if (admin.length) {
        var hashVerify = crypto
          .pbkdf2Sync(req.body.password, admin[0].salt, 10000, 64, "sha512")
          .toString("hex");

        if (admin[0].hash === hashVerify) {
          const tokenObject = auth.issueJWT(admin[0], "ADMIN");
          req.flash('flash_body', {code :200, success: true, message: "Successfully logged", token: tokenObject});
          return res.redirect('/');
        } else {
          req.flash('flash_body', {code :200, success: false, message: "You entered a wrong password"});
          return res.redirect('/login_page');
        }
      } else {
        req.flash('flash_body', {code :200, success: false, message: "This email not registered"});
        return res.redirect('/login_page');
      }
    })
    .catch((error) => {
      console.log(error);
      req.flash('flash_body', {code :200, success: false, message: error.message});
      return res.redirect('/');
    });
};

exports.getAllAdmins = (req, res, next) => {
  Admin.getAllAdmins()
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

exports.getAdminById = (req, res) => {
  Admin.getAdminById(req.params.id)
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
  Admin.getAdminById(req.params.id)
  .then(([admin]) => {
    let salt;
    let hash;
    if(req.body.password){
      salt = crypto.randomBytes(32).toString("hex");
      hash = crypto
          .pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512")
          .toString("hex");
    }
    if (admin.length) {
      const updatedAdmin = new Admin({
        name: req.body.name || admin[0].name,
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
};

const System = require("../models/system.model");

const activation = (req, res, next) => {
  System.getSystem()
    .then(([rows]) => {
      if (rows[0].is_active) {
        next();
      } else {
        if (req.jwt && req.jwt.sub.status === "ADMIN") {
          next();
        } else {
          return res.status(200).json({
            code: 200,
            success: false,
            message: "Sorry! System is deactivated",
          });
        }
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

module.exports.activation = activation;

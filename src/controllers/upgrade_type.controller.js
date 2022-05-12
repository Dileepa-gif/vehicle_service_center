const UpgradeType = require("../models/upgrade_type.model");

exports.create = (req, res) => {
  const newUpgradeType = new UpgradeType({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });
  newUpgradeType
    .create()
    .then(([result]) => {
      if (result.affectedRows === 1) {
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Successfully created",
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

exports.getAllUpgradeTypes = (req, res) => {
  res.render('admin_service', {
    pageTitle: "Manage Employees",
    t: false
});
  // UpgradeType.getAllUpgradeTypes()
  //   .then(([rows]) => {
  //     return res.status(200).json({
  //       code: 200,
  //       success: true,
  //       data: rows,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return res.status(200).json({
  //       code: 200,
  //       success: false,
  //       message: error.message,
  //     });
  //   });
};

exports.getUpgradeTypeById = (req, res) => {
  UpgradeType.getUpgradeTypeById(req.params.id)
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

  const updatedUpgradeType = new UpgradeType({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });
  updatedUpgradeType
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
};

exports.delete = (req, res) => {
  UpgradeType.delete(req.params.id)
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

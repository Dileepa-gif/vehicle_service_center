const UpgradeType = require("../models/upgrade_type.model");
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);

const upgradeTypeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(250),
    description: Joi.string().required().max(250),
    price: Joi.number().required()
  });
  return schema.validate(data);
};

exports.create = (req, res) => {

  const { error } = upgradeTypeValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });

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

  UpgradeType.getAllUpgradeTypes()
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

exports.getUpgradeTypeById = (req, res) => {
  UpgradeType.getUpgradeTypeById(req.params.id)
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

  const { error } = upgradeTypeValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });

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

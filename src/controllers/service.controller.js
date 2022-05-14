const Service = require("../models/service.model");
const TimeSlot = require("../models/time_slot.model");


exports.getAllServices = (req, res) => {
  Service.getAllServices()
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

exports.getServiceById = (req, res) => {
  Service.getServiceById(req.params.id)
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


exports.done = (req, res) => {
  Service.done(req.params.id, req.body.discount).then(([result]) => {
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
  });
};

exports.pay = (req, res) => {
  Service.pay(req.params.id, req.body.price, req.body.payment_method).then(([result]) => {
    if (result.affectedRows === 1) {    
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Successfully paid",
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "Please try again",
      });
    }
  });
};


exports.addRating = (req, res) => {
  Service.addRating(req.params.id, req.body.rating).then(([result]) => {
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
  });
};
const Service = require("../models/service.model");
const FCMToken = require("../models/fcm_toke.model");
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);
const { serviceDoneNotification } = require("../util/notification");


const serviceDoneValidation = (data) => {
  const schema = Joi.object({
    discount: Joi.number().required()
  });
  return schema.validate(data);
};

const servicePayValidation = (data) => {
  const schema = Joi.object({
    price: Joi.number().required(),
    payment_method: Joi.string().required()
  });
  return schema.validate(data);
};

const serviceAddRatingValidation = (data) => {
  const schema = Joi.object({
    rating: Joi.number().required()
  });
  return schema.validate(data);
};

exports.getAllServices = (req, res) => {
  Service.getAllServices()
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

exports.getActiveServices = (req, res) => {
  Service.getActiveServices()
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

exports.getHistory = (req, res) => {
  Service.getHistory()
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

exports.getServicesRelevantToToday = (req, res) => {
  var dateTime = require("node-datetime");
  var dt = dateTime.create();
  var today = dt.format("Y-m-d");
  Service.getServicesRelevantToToday(today)
    .then(([rows]) => {
      if (rows.length) {
        Service.getSummaryOfToday(today)
          .then(([summary]) => {
            return res.status(200).json({
              code: 200,
              success: true,
              data: rows,
              number_of_services: summary[0].number_of_services || 0,
              total_price: summary[0].total_price || 0,
              discounted_amount: summary[0].discounted_amount || 0,
              message: "Data received",
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

exports.getServiceById = (req, res) => {
  Service.getServiceById(req.params.id)
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

exports.done = (req, res) => {

  const { error } = serviceDoneValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });

  Service.done(req.params.id, req.body.discount)
    .then(([result]) => {
      if (result.affectedRows === 1) {
        Service.getServiceById(req.params.id)
          .then(([service]) => {

            FCMToken.getFCMTokensByCustomerId(service[0].customer_id)
              .then(([fcm_token_arr]) => {
                if (fcm_token_arr.length) {
                  serviceDoneNotification(service[0],fcm_token_arr);
                }
                return res.status(200).json({
                  code: 200,
                  success: true,
                  message: "Successfully updated",
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
};

exports.cashPaymentMethod = (req, res) => {
  Service.cashPaymentMethod(req.params.id)
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

exports.pay = (req, res) => {

  const { error } = servicePayValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });
   console.log("Payment amount is " +req.body.price);
  Service.pay(req.params.id, req.body.payment_method)
    .then(([result]) => {
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

exports.addRating = (req, res) => {

  const { error } = serviceAddRatingValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });

  Service.addRating(req.params.id, req.body.rating)
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

exports.getHistoryByVehicleId = (req, res) => {
  Service.getHistoryByVehicleId(req.params.id)
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

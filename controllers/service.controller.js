const Service = require("../models/service.model");
const TimeSlot = require("../models/time_slot.model");


exports.getAllServices = (req, res) => {
  Service.getAllServices()
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

exports.getActiveServices = (req, res) => {
  Service.getActiveServices()
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


exports.getHistory = (req, res) => {
  Service.getHistory()
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
  Service.cashPaymentMethod(req.params.id).then(([result]) => {
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
const Advertisement = require("../models/advertisement.model");

exports.create = (req, res) => {
  const newAdvertisement = new Advertisement({
    customer_id : req.jwt.sub.id,
    vehicle_type : req.body.vehicle_type,
    brand : req.body.brand,
    model : req.bod.model,
    year_of_manufacture : req.body.year_of_manufacture,
    condition : req.body.condition,
    description : req.body.description,
    price : req.body.price,
    is_sold : 0
  });
  newAdvertisement
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

exports.getAllAdvertisements = (req, res) => {
  Advertisement.getAllAdvertisements()
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

exports.getAdvertisementById = (req, res) => {
  Advertisement.getAdvertisementById(req.params.id)
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
  let number_of_vehicles = 0;
  TimeSlot.getTimeSlotById(req.body.time_slot_id)
    .then(([time_slot]) => {
      if (time_slot.length) {
        number_of_vehicles = time_slot[0].number_of_vehicles;

        Advertisement.getAdvertisementsCountByTimeSlotId(req.body.time_slot_id)
          .then(([advertisements]) => {
            if (advertisements[0].count < number_of_vehicles) {
              const updatedAdvertisement = new Advertisement({
                status: "Reserved",
                vehicle_reg_number: req.body.vehicle_reg_number,
                customer_id: req.jwt.sub.id,
                time_slot_id: time_slot[0].id,
                upgrade_type_id: req.body.upgrade_type_id,
              });
              updatedAdvertisement
                .update(req.params.id, req.jwt.sub.id)
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
                message: "Time slot is not available",
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
          message: "Time slot is not a working time",
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
  Advertisement.delete(req.params.id)
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

exports.changeStatus = (req, res) => {
  Advertisement.changeStatus(req.params.id).then(([result]) => {
    if (result.affectedRows === 1) {    
      const newService = new Service({
        is_done: 0,
        is_paid: 0,
        payment_method: null,
        discount: 0,
        rating: 0,
        advertisement_id: req.params.id,
        employee_id: req.jwt.sub.id,
      });
      newService
        .create()
        .then(([result]) => {
          if (result.affectedRows === 1) {
            return res.status(200).json({
              code: 200,
              success: true,
              message: "Successfully status changed",
            });
          } else {
            return res.status(200).json({
              code: 200,
              success: false,
              message: "Please try again",
            });
          }
        })
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "Please try again",
      });
    }
  });
};

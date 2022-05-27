const Appointment = require("../models/appointment.model");
const TimeSlot = require("../models/time_slot.model");
const Service = require("../models/service.model");

exports.create = (req, res) => {
  let number_of_vehicles = 0;

  TimeSlot.getTimeSlotById(req.body.time_slot_id)
    .then(([time_slot]) => {
      if (time_slot.length) {
        number_of_vehicles = time_slot[0].number_of_vehicles;
        Appointment.getAppointmentsCountByTimeSlotIdAndDate(req.body.time_slot_id, req.body.date)
          .then(([appointments]) => {
            console.log(appointments)
            if (appointments[0].count < number_of_vehicles) {
              const newAppointment = new Appointment({
                status: "Reserved",
                date: req.body.date,
                vehicle_id: req.body.vehicle_id,
                customer_id: req.jwt.sub.id,
                time_slot_id: req.body.time_slot_id,
                upgrade_type_id: req.body.upgrade_type_id,
              });
              console.log("00 = ", newAppointment)
              newAppointment
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

exports.getAllAppointments = (req, res) => {
  Appointment.getAllAppointments()
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

exports.getAppointmentById = (req, res) => {
  Appointment.getAppointmentById(req.params.id)
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
  let number_of_vehicles = 0;
  TimeSlot.getTimeSlotById(req.body.time_slot_id)
    .then(([time_slot]) => {
      if (time_slot.length) {
        number_of_vehicles = time_slot[0].number_of_vehicles;

        Appointment.getAppointmentsCountByTimeSlotIdAndDate(req.body.time_slot_id, req.body.date)
          .then(([appointments]) => {
            if (appointments[0].count < number_of_vehicles) {
              const updatedAppointment = new Appointment({
                status: "Reserved",
                date: req.body.date,
                vehicle_id: req.body.vehicle_id,
                customer_id: req.jwt.sub.id,
                time_slot_id: req.body.time_slot_id,
                upgrade_type_id: req.body.upgrade_type_id,
              });
              updatedAppointment
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
  Appointment.delete(req.params.id)
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
  Appointment.changeStatus(req.params.id).then(([result]) => {
    if (result.affectedRows === 1) {    
      const newService = new Service({
        is_done: 0,
        is_paid: 0,
        payment_method: null,
        discount: 0,
        rating: 0,
        appointment_id: req.params.id,
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
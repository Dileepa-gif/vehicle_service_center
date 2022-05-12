const Appointment = require("../models/appointment.model");
const TimeSlot = require("../models/time_slot.model");

exports.create = (req, res) => {
  const pick_datetime = new Date(req.body.pick_datetime);
  let hour = pick_datetime.getHours();
  let number_of_vehicles = 0;
  console.log("hour = ", hour);

  TimeSlot.getTimeSlotByHour(hour)
    .then(([time_slot]) => {
      if (time_slot.length) {
        number_of_vehicles = time_slot[0].number_of_vehicles;
        console.log("number_of_vehicles = ", time_slot);
        Appointment.getAppointmentsCountByTimeSlotId(time_slot[0].id)
          .then(([appointments]) => {
            if (appointments[0].count < number_of_vehicles) {
              const newAppointment = new Appointment({
                status: "Reserved",
                pick_datetime: req.body.pick_datetime,
                vehicle_reg_number: req.body.vehicle_reg_number,
                customer_id : req.jwt.sub.id,
                time_slot_id: time_slot[0].id,
                upgrade_type_id: req.body.upgrade_type_id,
              });
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

exports.getAppointmentById = (req, res) => {
  Appointment.getAppointmentById(req.params.id)
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
  if (req.body.pick_datetime) {
    const pick_datetime = new Date(req.body.pick_datetime);
    let hour = pick_datetime.getHours();
    let number_of_vehicles = 0;
    console.log(hour);

    TimeSlot.getTimeSlotByHour(hour)
      .then(([time_slot]) => {
        if (time_slot.length) {
          number_of_vehicles = time_slot[0].number_of_vehicles;

          Appointment.getAppointmentsCountByTimeSlotId(time_slot[0].id)
            .then(([appointments]) => {
              if (appointments[0].count < number_of_vehicles) {
                const updatedAppointment = new Appointment({
                  status: "Reserved",
                  pick_datetime: req.body.pick_datetime,
                  vehicle_reg_number: req.body.vehicle_reg_number,
                  customer_id : req.jwt.sub.id,
                  time_slot_id: time_slot[0].id,
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
  } else {
    Appointment.getAppointmentById(req.params.id)
      .then(([appointment]) => {
        if (appointment.length) {
          const updatedAppointment = new Appointment({
            status: "Reserved",
            pick_datetime: appointment[0].pick_datetime,
            vehicle_reg_number: req.body.vehicle_reg_number,
            customer_id : req.jwt.sub.id,
            time_slot_id: appointment[0].time_slot_id,
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
  }

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

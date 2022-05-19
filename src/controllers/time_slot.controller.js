const TimeSlot = require("../models/time_slot.model");
const Appointment = require("../models/appointment.model");

exports.getAllTimeSlots = (req, res) => {
  TimeSlot.getAllTimeSlots()
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

exports.getTimeSlotById = (req, res) => {
  TimeSlot.getTimeSlotById(req.params.id)
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
  TimeSlot.getTimeSlotById(req.params.id)
  .then(([time_slot]) => {
    const updatedTimeSlot = new TimeSlot({
      start: time_slot[0].start,
      end: time_slot[0].end,
      number_of_vehicles: req.body.number_of_vehicles,
    });
    updatedTimeSlot
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

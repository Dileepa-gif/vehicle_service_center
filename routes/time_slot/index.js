const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var timeSlotController = require('../../controllers/time_slot.controller');

routes.put("/update/:id", auth.authMiddleware(["ADMIN"]), timeSlotController.update);
routes.get('/getAllTimeSlots', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, timeSlotController.getAllTimeSlots);
routes.get('/getTimeSlotById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, timeSlotController.getTimeSlotById);

module.exports = routes;
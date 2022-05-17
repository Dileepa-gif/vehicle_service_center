const routes = require('express').Router();
//const uploads = require('../../lib/multer');
const auth = require('../../util/auth');
const system =  require('../../util/system');
var timeSlotController = require('../../controllers/time_slot.controller');

routes.put("/update/:id", auth.authMiddleware(["ADMIN"]), timeSlotController.update);
routes.get('/getAllTimeSlots', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, timeSlotController.getAllTimeSlots);
routes.get('/getTimeSlotById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, timeSlotController.getTimeSlotById);

module.exports = routes;
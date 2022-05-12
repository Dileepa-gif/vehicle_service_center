const routes = require('express').Router();
//const uploads = require('../../lib/multer');
const auth = require('../../util/auth');
var timeSlotController = require('../../controllers/time_slot.controller');

routes.put("/update/:id", auth.authMiddleware(["ADMIN"]), timeSlotController.update);
routes.get('/getAllTimeSlots', timeSlotController.getAllTimeSlots);
routes.get('/getTimeSlotById/:id', timeSlotController.getTimeSlotById);

module.exports = routes;
const routes = require('express').Router();
//const uploads = require('../../lib/multer');
const auth = require('../../util/auth');
var appointmentController = require('../../controllers/appointment.controller');

routes.post('/create',auth.authMiddleware(["CUSTOMER"]), appointmentController.create);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), appointmentController.update);
routes.delete("/delete/:id", auth.authMiddleware(["CUSTOMER"]), appointmentController.delete);
routes.get('/getAllAppointments', appointmentController.getAllAppointments);
routes.get('/getAppointmentById/:id', appointmentController.getAppointmentById);

module.exports = routes;
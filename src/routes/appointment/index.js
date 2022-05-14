const routes = require('express').Router();
const auth = require('../../util/auth');
var appointmentController = require('../../controllers/appointment.controller');

routes.post('/create',auth.authMiddleware(["CUSTOMER"]), appointmentController.create);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), appointmentController.update);
routes.delete("/delete/:id", auth.authMiddleware(["CUSTOMER"]), appointmentController.delete);
routes.get('/getAllAppointments', appointmentController.getAllAppointments);
routes.get('/getAppointmentById/:id', appointmentController.getAppointmentById);
routes.get('/changeStatus/:id', auth.authMiddleware(["EMPLOYEE"]), appointmentController.changeStatus);

module.exports = routes;
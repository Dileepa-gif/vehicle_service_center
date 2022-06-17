const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var appointmentController = require('../../controllers/appointment.controller');

routes.post('/create',auth.authMiddleware(["CUSTOMER"]), system_status.activation, appointmentController.create);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), system_status.activation, appointmentController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN","CUSTOMER"]), system_status.activation, appointmentController.delete);
routes.get('/getAllAppointments', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, appointmentController.getAllAppointments);
routes.get('/getNotArrivedAppointments', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, appointmentController.getNotArrivedAppointments);
routes.get('/getAppointmentsRelevantToToday', auth.authMiddleware(["ADMIN","EMPLOYEE"]), system_status.activation, appointmentController.getAppointmentsRelevantToToday);
routes.get('/getAppointmentById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, appointmentController.getAppointmentById);
routes.get('/getAppointmentsByCustomerId/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, appointmentController.getAppointmentsByCustomerId);
routes.get('/changeStatus/:id', auth.authMiddleware(["EMPLOYEE"]), system_status.activation, appointmentController.changeStatus);

module.exports = routes;
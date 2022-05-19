const routes = require('express').Router();
const auth = require('../../util/auth');
const system =  require('../../util/system');
var appointmentController = require('../../controllers/appointment.controller');

routes.post('/create',auth.authMiddleware(["CUSTOMER"]), system.activation, appointmentController.create);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), system.activation, appointmentController.update);
routes.delete("/delete/:id", auth.authMiddleware(["CUSTOMER"]), system.activation, appointmentController.delete);
routes.get('/getAllAppointments', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, appointmentController.getAllAppointments);
routes.get('/getAppointmentById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, appointmentController.getAppointmentById);
routes.get('/changeStatus/:id', auth.authMiddleware(["EMPLOYEE"]), system.activation, appointmentController.changeStatus);

module.exports = routes;
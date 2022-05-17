const routes = require('express').Router();
const auth = require('../../util/auth');
const system =  require('../../util/system');
var advertisementController = require('../../controllers/advertisement.controller');

routes.post('/create',auth.authMiddleware(["CUSTOMER"]), system.activation, advertisementController.create);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), system.activation, advertisementController.update);
routes.delete("/delete/:id", auth.authMiddleware(["CUSTOMER"]), system.activation, advertisementController.delete);
routes.get('/getAllAppointments', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, advertisementController.getAllAppointments);
routes.get('/getAppointmentById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, advertisementController.getAppointmentById);
routes.get('/changeStatus/:id', auth.authMiddleware(["EMPLOYEE"]), system.activation, advertisementController.changeStatus);

module.exports = routes;
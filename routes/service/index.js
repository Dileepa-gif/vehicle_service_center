const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var serviceController = require('../../controllers/service.controller');


routes.put("/pay/:id", auth.authMiddleware(["EMPLOYEE","CUSTOMER"]), system_status.activation, serviceController.pay);
routes.put("/done/:id", auth.authMiddleware(["EMPLOYEE"]), system_status.activation, serviceController.done);
routes.put("/addRating/:id", auth.authMiddleware(["CUSTOMER"]), system_status.activation, serviceController.addRating);
routes.get('/getAllServices', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, serviceController.getAllServices);
routes.get('/getActiveServices', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, serviceController.getActiveServices);
routes.get('/getHistory', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, serviceController.getHistory);
routes.get('/getServicesRelevantToToday', auth.authMiddleware(["ADMIN","EMPLOYEE"]), system_status.activation, serviceController.getServicesRelevantToToday);
routes.get('/getServiceById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, serviceController.getServiceById);
routes.get('/getHistoryByVehicleId/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, serviceController.getHistoryByVehicleId);

module.exports = routes;
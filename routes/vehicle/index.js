const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var vehicleController = require('../../controllers/vehicle.controller');

routes.post('/create',auth.authMiddleware(["CUSTOMER"]), vehicleController.create);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), vehicleController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN", "CUSTOMER"]), vehicleController.delete);
routes.get('/getAllVehicles', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, vehicleController.getAllVehicles);
routes.get('/getVehicleById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, vehicleController.getVehicleById);
routes.get('/getVehiclesByCustomerId/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, vehicleController.getVehiclesByCustomerId);
routes.get('/getNotAdvertisedVehiclesByCustomerId/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, vehicleController.getNotAdvertisedVehiclesByCustomerId);

module.exports = routes;
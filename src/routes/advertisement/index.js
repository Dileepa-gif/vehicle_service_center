const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var advertisementController = require('../../controllers/advertisement.controller');

routes.post('/create',auth.authMiddleware(["CUSTOMER"]), system_status.activation, advertisementController.create);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), system_status.activation, advertisementController.update);
routes.delete("/delete/:id", auth.authMiddleware(["CUSTOMER"]), system_status.activation, advertisementController.delete);
routes.get('/getAllAdvertisements', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, advertisementController.getAllAdvertisements);
routes.get('/getAdvertisementById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, advertisementController.getAdvertisementById);
routes.get('/changeStatus/:id', auth.authMiddleware(["CUSTOMER"]), system_status.activation, advertisementController.changeStatus);

module.exports = routes;
const routes = require('express').Router();
const auth = require('../../util/auth');
const system =  require('../../util/system');
var serviceController = require('../../controllers/service.controller');


routes.put("/pay/:id", auth.authMiddleware(["CUSTOMER"]), system.activation, serviceController.pay);
routes.put("/done/:id", auth.authMiddleware(["EMPLOYEE"]), system.activation, serviceController.done);
routes.put("/addRating/:id", auth.authMiddleware(["CUSTOMER"]), system.activation, serviceController.addRating);
routes.get('/getAllServices', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, serviceController.getAllServices);
routes.get('/getServiceById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, serviceController.getServiceById);

module.exports = routes;
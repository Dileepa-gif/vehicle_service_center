const routes = require('express').Router();
//const uploads = require('../../lib/multer');
const auth = require('../../util/auth');
var serviceController = require('../../controllers/service.controller');

routes.put("/addRating/:id", auth.authMiddleware(["CUSTOMER"]), serviceController.addRating);
routes.put("/done/:id", auth.authMiddleware(["EMPLOYEE"]), serviceController.done);
routes.get('/getAllServices', serviceController.getAllServices);
routes.get('/getServiceById/:id', serviceController.getServiceById);

module.exports = routes;
const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var carouselController = require('../../controllers/carousel.controller');

routes.post('/create',auth.authMiddleware(["ADMIN"]), system_status.activation, carouselController.create);
routes.put("/update/:id", auth.authMiddleware(["ADMIN"]), system_status.activation, carouselController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN"]), system_status.activation, carouselController.delete);
routes.get('/getAllCarousels', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, carouselController.getAllCarousels);
routes.get('/getCarouselById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, carouselController.getCarouselById);

module.exports = routes;
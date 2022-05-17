const routes = require('express').Router();
//const uploads = require('../../lib/multer');
const auth = require('../../util/auth');
const system =  require('../../util/system');
var upgradeTypeController = require('../../controllers/upgrade_type.controller');

routes.post('/create',auth.authMiddleware(["ADMIN"]), upgradeTypeController.create);
routes.put("/update/:id", auth.authMiddleware(["ADMIN"]), upgradeTypeController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN"]), upgradeTypeController.delete);
routes.get('/getAllVehicles', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, upgradeTypeController.getAllVehicles);
routes.get('/getVehicleById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, upgradeTypeController.getVehicleById);

module.exports = routes;
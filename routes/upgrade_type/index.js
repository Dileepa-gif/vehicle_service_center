const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var upgradeTypeController = require('../../controllers/upgrade_type.controller');

routes.post('/create',auth.authMiddleware(["ADMIN"]), upgradeTypeController.create);
routes.put("/update/:id", auth.authMiddleware(["ADMIN"]), upgradeTypeController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN"]), upgradeTypeController.delete);
routes.get('/getAllUpgradeTypes', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, upgradeTypeController.getAllUpgradeTypes);
routes.get('/getUpgradeTypeById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, upgradeTypeController.getUpgradeTypeById);

module.exports = routes;
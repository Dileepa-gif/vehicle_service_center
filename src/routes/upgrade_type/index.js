const routes = require('express').Router();
//const uploads = require('../../lib/multer');
const auth = require('../../util/auth');
var upgradeTypeController = require('../../controllers/upgrade_type.controller');

routes.post('/create',auth.authMiddleware(["ADMIN"]), upgradeTypeController.create);
routes.put("/update/:id", auth.authMiddleware(["ADMIN"]), upgradeTypeController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN"]), upgradeTypeController.delete);
routes.get('/getAllUpgradeTypes', upgradeTypeController.getAllUpgradeTypes);
routes.get('/getUpgradeTypeById/:id', upgradeTypeController.getUpgradeTypeById);

module.exports = routes;
const routes = require('express').Router();
const auth = require('../../util/auth');
var adminController = require('../../controllers/admin.controller');

routes.post('/register', adminController.register);
routes.post('/login', adminController.login);
routes.post('/passwordReset', adminController.passwordReset);
routes.put("/update/:id", auth.authMiddleware(["ADMIN"]), adminController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN"]), adminController.delete);
routes.get('/getAllAdmins', auth.authMiddleware(["ADMIN"]), adminController.getAllAdmins);
routes.get('/getAdminById/:id', auth.authMiddleware(["ADMIN"]), adminController.getAdminById);

module.exports = routes;
const routes = require('express').Router();
//const uploads = require('../../lib/multer');
const auth = require('../../util/auth');
var customerController = require('../../controllers/customer.controller');

routes.post('/register', customerController.register);
routes.post('/login', customerController.login);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), customerController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN","CUSTOMER"]), customerController.delete);
routes.get('/getAllCustomers', auth.authMiddleware(["ADMIN","EMPLOYEE"]), customerController.getAllCustomers);
routes.get('/getCustomerById/:id',  auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), customerController.getCustomerById);

module.exports = routes;
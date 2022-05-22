const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var customerController = require('../../controllers/customer.controller');


routes.post('/signUp', system_status.activation, customerController.signUp);
routes.put('/register/:id', auth.authMiddleware(["CUSTOMER"]), system_status.activation, customerController.register);
routes.post('/login', system_status.activation, customerController.login);
routes.post('/passwordReset', system_status.activation, customerController.passwordReset);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), system_status.activation, customerController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN","CUSTOMER"]), system_status.activation, customerController.delete);
routes.get('/getAllCustomers', auth.authMiddleware(["ADMIN","EMPLOYEE"]), system_status.activation, customerController.getAllCustomers);
routes.get('/getCustomerById/:id',  auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, customerController.getCustomerById);

module.exports = routes;
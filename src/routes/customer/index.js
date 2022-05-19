const routes = require('express').Router();
const auth = require('../../util/auth');
const system =  require('../../util/system');
var customerController = require('../../controllers/customer.controller');


routes.post('/signUp', system.activation, customerController.signUp);
routes.put('/register/:id', auth.authMiddleware(["CUSTOMER"]), system.activation, customerController.register);
routes.post('/login', system.activation, customerController.login);
routes.put("/update/:id", auth.authMiddleware(["CUSTOMER"]), system.activation, customerController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN","CUSTOMER"]), system.activation, customerController.delete);
routes.get('/getAllCustomers', auth.authMiddleware(["ADMIN","EMPLOYEE"]), system.activation, customerController.getAllCustomers);
routes.get('/getCustomerById/:id',  auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, customerController.getCustomerById);

module.exports = routes;
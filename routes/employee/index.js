const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var employeeController = require('../../controllers/employee.controller');

routes.post('/register', auth.authMiddleware(["ADMIN"]), employeeController.register);
routes.post('/login', system_status.activation,employeeController.login);
routes.put("/update/:id", auth.authMiddleware(["EMPLOYEE",]), system_status.activation, employeeController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN"]), employeeController.delete);
routes.get('/getAllEmployees', auth.authMiddleware(["ADMIN"]), system_status.activation, employeeController.getAllEmployees);
routes.get('/getEmployeeById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system_status.activation, employeeController.getEmployeeById);

module.exports = routes; 
const routes = require('express').Router();
//const uploads = require('../../lib/multer');
const auth = require('../../util/auth');
const system =  require('../../util/system');
var employeeController = require('../../controllers/employee.controller');

routes.post('/register', auth.authMiddleware(["ADMIN"]), employeeController.register);
routes.post('/login', system.activation,employeeController.login);
routes.put("/update/:id", auth.authMiddleware(["EMPLOYEE",]), system.activation, employeeController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN"]), employeeController.delete);
routes.get('/getAllEmployees', auth.authMiddleware(["ADMIN","EMPLOYEE"]), system.activation, employeeController.getAllEmployees);
routes.get('/getEmployeeById/:id', auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), system.activation, employeeController.getEmployeeById);

module.exports = routes; 
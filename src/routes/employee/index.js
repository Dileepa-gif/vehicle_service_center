const routes = require('express').Router();
//const uploads = require('../../lib/multer');
const auth = require('../../util/auth');
var employeeController = require('../../controllers/employee.controller');

routes.post('/register', auth.authMiddleware(["ADMIN"]), employeeController.register);
routes.post('/login', employeeController.login);
routes.put("/update/:id", auth.authMiddleware(["EMPLOYEE",]), employeeController.update);
routes.delete("/delete/:id", auth.authMiddleware(["ADMIN"]), employeeController.delete);
routes.get('/getAllEmployees', auth.authMiddleware(["ADMIN","EMPLOYEE"]), employeeController.getAllEmployees);
routes.get('/getEmployeeById/:id',auth.authMiddleware(["ADMIN","EMPLOYEE","CUSTOMER"]), employeeController.getEmployeeById);

module.exports = routes;
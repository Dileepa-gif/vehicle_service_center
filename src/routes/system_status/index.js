const routes = require('express').Router();
const auth = require('../../util/auth');
const system_status =  require('../../util/system_status');
var systemStatusController= require('../../controllers/system_status.controller');

routes.post("/update", auth.authMiddleware(["ADMIN"]), systemStatusController.update);
routes.get('/getSystemStatus', auth.authMiddleware(["ADMIN"]), systemStatusController.getSystemStatus);

module.exports = routes;
const routes = require('express').Router();
const auth = require('../../util/auth');
const system =  require('../../util/system');
var systemController = require('../../controllers/system.controller');

routes.post("/update", auth.authMiddleware(["ADMIN"]), systemController.update);
routes.get('/getSystem', auth.authMiddleware(["ADMIN"]), systemController.getSystem);

module.exports = routes;
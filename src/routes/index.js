const routes = require('express').Router();


const adminRoutes = require('./admin');
const employeeRoutes = require('./employee');
const upgradeTypeRoutes = require('./upgrade_type');
const timeSlotRoutes = require('./time_slot');

routes.use("/admin", adminRoutes);
routes.use("/employee", employeeRoutes);
routes.use("/upgrade_type", upgradeTypeRoutes);
routes.use("/time_slot", timeSlotRoutes);



module.exports = routes;

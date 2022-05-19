const routes = require('express').Router();


const adminRoutes = require('./admin');
const employeeRoutes = require('./employee');
const customerRoutes = require('./customer');
const upgradeTypeRoutes = require('./upgrade_type');
const timeSlotRoutes = require('./time_slot');
const appointmentRoutes = require('./appointment');
const serviceRoutes = require('./service');
const systemRoutes = require('./system');
const vehicleRoutes = require('./vehicle');


routes.use("/admin", adminRoutes);
routes.use("/employee", employeeRoutes);
routes.use("/customer", customerRoutes);
routes.use("/upgrade_type", upgradeTypeRoutes);
routes.use("/time_slot", timeSlotRoutes);
routes.use("/appointment", appointmentRoutes);
routes.use("/service", serviceRoutes);
routes.use("/system", systemRoutes);
routes.use("/vehicle", vehicleRoutes);



module.exports = routes;

const routes = require('express').Router();


const adminRoutes = require('./admin');
const employeeRoutes = require('./employee');
const customerRoutes = require('./customer');
const upgradeTypeRoutes = require('./upgrade_type');
const timeSlotRoutes = require('./time_slot');
const appointmentRoutes = require('./appointment');
const serviceRoutes = require('./service');
const systemStatusRoutes = require('./system_status');
const vehicleRoutes = require('./vehicle');
const advertisementRoutes = require('./advertisement');
const viewRoutes = require('./view_page');


routes.use("/admin", adminRoutes);
routes.use("/employee", employeeRoutes);
routes.use("/customer", customerRoutes);
routes.use("/upgrade_type", upgradeTypeRoutes);
routes.use("/time_slot", timeSlotRoutes);
routes.use("/appointment", appointmentRoutes);
routes.use("/service", serviceRoutes);
routes.use("/system_status", systemStatusRoutes);
routes.use("/vehicle", vehicleRoutes);
routes.use("/advertisement", advertisementRoutes);
routes.use("", viewRoutes);



module.exports = routes;

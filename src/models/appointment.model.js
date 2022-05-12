const db = require('../util/database');

module.exports = class Appointment {
    constructor(appointment) {
        this.status = appointment.status;
        this.pick_datetime = appointment.pick_datetime;
        this.vehicle_reg_number = appointment.vehicle_reg_number;
        this.customer_id  = appointment.customer_id ;
        this.time_slot_id  = appointment.time_slot_id ;
        this.upgrade_type_id  = appointment.upgrade_type_id ;
    }

    static getAllAppointments() {
        const query = "SELECT * FROM appointment";
        return db.execute(query);
    }

    static getAppointmentById(id) {
        const query = `SELECT * FROM appointment WHERE id = '${id}'`;
        return db.execute(query);
    }

    static delete(id, customer_id) {
        const query = `DELETE FROM appointment WHERE id = '${id}'  AND customer_id =  '${customer_id}'`;
        return db.execute(query);
    }

    static getAppointmentsCountByTimeSlotId(time_slot_id) {
        const query = `SELECT COUNT(id) as count FROM appointment WHERE time_slot_id = '${time_slot_id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO appointment (status, pick_datetime, vehicle_reg_number, customer_id, time_slot_id, upgrade_type_id) VALUE(?,?,?,?,?,?)`;
        return db.execute(query, [this.status, this.pick_datetime, this.vehicle_reg_number, this.customer_id, this.time_slot_id, this.upgrade_type_id]);
    }


    update(id, customer_id) {
        const query = `UPDATE appointment set status = ?, pick_datetime = ?, vehicle_reg_number = ?, customer_id = ?, time_slot_id = ?, upgrade_type_id = ? WHERE id = ?  AND customer_id = ?`;
        return db.execute(query, [this.status, this.pick_datetime, this.vehicle_reg_number, this.customer_id, this.time_slot_id, this.upgrade_type_id, id, customer_id]);
    }
    

};

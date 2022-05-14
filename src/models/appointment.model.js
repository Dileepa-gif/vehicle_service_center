const db = require('../util/database');

module.exports = class Appointment {
    constructor(appointment) {
        this.status = appointment.status;
        this.vehicle_reg_number = appointment.vehicle_reg_number;
        this.customer_id  = appointment.customer_id ;
        this.time_slot_id  = appointment.time_slot_id ;
        this.upgrade_type_id  = appointment.upgrade_type_id ;
    }

    static getAllAppointments() {
        const query = `SELECT a.*, c.name AS customer_name, c.email, c.nic_number, c.phone_number, c.address, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time FROM appointment a 
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id`;
        return db.execute(query);
    }

    static getAppointmentById(id) {
        const query = `SELECT a.*, c.name AS customer_name, c.email, c.nic_number, c.phone_number, c.address, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time FROM appointment a 
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id WHERE a.id = '${id}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM appointment WHERE id = '${id}'`;
        return db.execute(query);
    }

    static getAppointmentsCountByTimeSlotId(time_slot_id) {
        const query = `SELECT COUNT(id) as count FROM appointment WHERE time_slot_id = '${time_slot_id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO appointment (status, vehicle_reg_number, customer_id, time_slot_id, upgrade_type_id) VALUE(?,?,?,?,?)`;
        return db.execute(query, [this.status, this.vehicle_reg_number, this.customer_id, this.time_slot_id, this.upgrade_type_id]);
    }


    update(id, customer_id) {
        const query = `UPDATE appointment set status = ?,  vehicle_reg_number = ?, customer_id = ?, time_slot_id = ?, upgrade_type_id = ? WHERE id = ?  AND customer_id = ? AND NOT status = 'Arrived' `;
        return db.execute(query, [this.status, this.vehicle_reg_number, this.customer_id, this.time_slot_id, this.upgrade_type_id, id, customer_id]);
    }

    static changeStatus(id) {
        const query = `UPDATE appointment set status = 'Arrived' WHERE id = '${id}'`;
        return db.execute(query);
    }
    

};

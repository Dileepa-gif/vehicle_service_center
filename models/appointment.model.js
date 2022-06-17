const db = require('../util/database');

module.exports = class Appointment {
    constructor(appointment) {
        this.status = appointment.status;
        this.date = appointment.date;
        this.vehicle_id = appointment.vehicle_id;
        this.customer_id  = appointment.customer_id ;
        this.time_slot_id  = appointment.time_slot_id ;
        this.upgrade_type_id  = appointment.upgrade_type_id ;
    }

    static getAllAppointments() {
        const query = `SELECT a.id, a.status, DATE_FORMAT(a.date, "%Y:%m:%d") AS date, DATE_FORMAT(a.created_at, "%Y:%m:%d %H:%i") AS created_at, a.vehicle_id, a.customer_id, a.time_slot_id, a.upgrade_type_id, c.first_name AS user_first_name, c.last_name AS user_last_name, c.email, c.contact_number, c.nic_number, c.is_completed, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time, v.vehicle_type, v.vehicle_number FROM appointment a 
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN vehicle v ON a.vehicle_id = v.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id ORDER BY a.date`;
        return db.execute(query);
    }

    static getNotArrivedAppointments() {
        const query = `SELECT a.id, a.status, DATE_FORMAT(a.date, "%Y:%m:%d") AS date, DATE_FORMAT(a.created_at, "%Y:%m:%d %H:%i") AS created_at, a.vehicle_id, a.customer_id, a.time_slot_id, a.upgrade_type_id, c.first_name AS user_first_name, c.last_name AS user_last_name, c.email, c.contact_number, c.nic_number, c.is_completed, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time, v.vehicle_type, v.vehicle_number FROM appointment a 
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN vehicle v ON a.vehicle_id = v.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id WHERE a.status = 'Reserved' ORDER BY a.date`;
        return db.execute(query);
    }

    static getAppointmentsRelevantToToday(today) {
        const query = `SELECT a.id, a.status, DATE_FORMAT(a.date, "%Y:%m:%d") AS date, DATE_FORMAT(a.created_at, "%Y:%m:%d %H:%i") AS created_at, a.vehicle_id, a.customer_id, a.time_slot_id, a.upgrade_type_id, c.first_name AS user_first_name, c.last_name AS user_last_name, c.email, c.contact_number, c.nic_number, c.is_completed, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time, v.vehicle_type, v.vehicle_number FROM appointment a 
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN vehicle v ON a.vehicle_id = v.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id WHERE a.date LIKE '${today}%' ORDER BY ts.id;`;
        return db.execute(query);
    }

    static getArrivedAppointmentsCount(today) {
        const query = `SELECT COUNT(id) AS count FROM appointment WHERE status = "Arrived" AND date LIKE '${today}%';`;
        return db.execute(query);
    }

    static getReservedAppointmentsCount(today) {
        const query = `SELECT COUNT(id) AS count FROM appointment WHERE status = "Reserved" AND date LIKE '${today}%';`;
        return db.execute(query);
    }

    static getAppointmentById(id) {
        const query = `SELECT a.id, a.status, DATE_FORMAT(a.date, "%Y:%m:%d") AS date, DATE_FORMAT(a.created_at, "%Y:%m:%d %H:%i") AS created_at, a.vehicle_id, a.customer_id, a.time_slot_id, a.upgrade_type_id, c.first_name AS user_first_name, c.last_name AS user_last_name, c.email, c.contact_number, c.nic_number, c.is_completed, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time, v.vehicle_type, v.vehicle_number FROM appointment a 
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN vehicle v ON a.vehicle_id = v.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id WHERE a.id = '${id}'`;
        return db.execute(query);
    }


    static getAppointmentsByCustomerId(id) {
        const query = `SELECT a.id, a.status, DATE_FORMAT(a.date, "%Y:%m:%d") AS date, DATE_FORMAT(a.created_at, "%Y:%m:%d %H:%i") AS created_at, a.vehicle_id, a.customer_id, a.time_slot_id, a.upgrade_type_id, c.first_name AS user_first_name, c.last_name AS user_last_name, c.email, c.contact_number, c.nic_number, c.is_completed, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time, v.vehicle_type, v.vehicle_number FROM appointment a 
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN vehicle v ON a.vehicle_id = v.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id WHERE a.customer_id = '${id}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM appointment WHERE id = '${id}'`;
        return db.execute(query);
    }

    static getAppointmentsCountByTimeSlotIdAndDate(time_slot_id, date) {
        const query = `SELECT COUNT(id) as count FROM appointment WHERE time_slot_id = '${time_slot_id}' AND date  = '${date}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO appointment (status, date, vehicle_id, customer_id, time_slot_id, upgrade_type_id) VALUE(?,?,?,?,?,?)`;
        return db.execute(query, [this.status, this.date, this.vehicle_id, this.customer_id, this.time_slot_id, this.upgrade_type_id]);
    }


    update(id, customer_id) {
        const query = `UPDATE appointment set status = ?, date = ?,  vehicle_id = ?, customer_id = ?, time_slot_id = ?, upgrade_type_id = ? WHERE id = ?  AND customer_id = ? AND NOT status = 'Arrived' `;
        return db.execute(query, [this.status, this.date, this.vehicle_id, this.customer_id, this.time_slot_id, this.upgrade_type_id, id, customer_id]);
    }

    static changeStatus(id) {
        const query = `UPDATE appointment set status = 'Arrived' WHERE id = '${id}'`;
        return db.execute(query);
    }
    

};

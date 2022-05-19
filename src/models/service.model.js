const db = require('../util/database');

module.exports = class Service {
    constructor(service) {
        this.is_done = service.is_done;
        this.is_paid = service.is_paid;
        this.payment_method  = service.payment_method ;
        this.discount = service.discount ;
        this.rating = service.rating ;
        this.appointment_id = service.appointment_id;
        this.employee_id  = service.employee_id ;
    }

    static getAllServices() {
        const query = `SELECT s.*, a.status, a.date, a.vehicle_id, a.customer_id, a.time_slot_id, a.upgrade_type_id, c.first_name AS user_first_name, c.last_name AS user_last_name, c.email, c.contact_number, c.nic_number, c.is_completed, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time, v.vehicle_type, v.vehicle_number  FROM service s 
        INNER JOIN appointment a ON s.appointment_id = a.id
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN vehicle v ON a.vehicle_id = v.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id`;
        return db.execute(query);
    }

    static getServiceById(id) {
        const query = `SELECT s.*, a.status, a.date, a.vehicle_id, a.customer_id, a.time_slot_id, a.upgrade_type_id, c.first_name AS user_first_name, c.last_name AS user_last_name, c.email, c.contact_number, c.nic_number, c.is_completed, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time, v.vehicle_type, v.vehicle_number FROM service s 
        INNER JOIN appointment a ON s.appointment_id = a.id
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN vehicle v ON a.vehicle_id = v.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id WHERE s.id = '${id}'`;
        return db.execute(query);
    }

    static done(id, discount){
        const query = `UPDATE service set is_done = 1, discount = ?  WHERE id = ? AND is_paid = 0`;
        return db.execute(query, [discount, id]);
    }

    static pay(id, price, payment_method){
        const query = `UPDATE service s INNER JOIN appointment a ON s.appointment_id = a.id INNER JOIN upgrade_type ut ON a.upgrade_type_id = ut.id SET s.is_paid = 1, s.payment_method = ? WHERE s.id = ? AND s.is_done = 1 AND ut.price = ((ut.price*s.discount/100)+ ?);`;
        return db.execute(query, [payment_method, id, price]);
    }

    static addRating(id, rating){
        const query = `UPDATE service set rating = ? WHERE id = ? AND is_done = 1`;
        return db.execute(query, [rating, id]);
    }

    create() {
        const query = `INSERT INTO service (is_done, is_paid, payment_method, discount, rating, appointment_id, employee_id) VALUE(?,?,?,?,?,?,?)`;
        return db.execute(query, [this.is_done, this.is_paid, this.payment_method, this.discount, this.rating, this.appointment_id, this.employee_id]);
    }


    update(id) {
        const query = `UPDATE service set is_done = ?,  is_paid = ?, payment_method = ?, discount = ?, rating = ?, appointment_id = ?, employee_id = ?, WHERE id = ?`;
        return db.execute(query, [this.is_done, this.is_paid, this.payment_method, this.discount, this.rating, this.appointment_id, this.employee_id, id]);
    }
    

};

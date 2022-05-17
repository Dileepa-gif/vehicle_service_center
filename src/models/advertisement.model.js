const db = require('../util/database');

module.exports = class Advertisementnt {
    constructor(advertisement) {
        this.customer_id = advertisement.customer_id;
        this.vehicle_type = advertisement.vehicle_type;
        this.brand  = advertisement.brand ;
        this.model  = advertisement.model ;
        this.year_of_manufacture  = advertisement.year_of_manufacture ;
        this.condition = advertisement.condition;
        this.description  = advertisement.description ;
        this.price  = advertisement.price ;
        this.is_sold  = advertisement.is_sold ;
    }

    static getAllAdvertisementnts() {
        const query = `SELECT a.*, c.name AS customer_name, c.email, c.nic_number, c.phone_number, c.address, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time FROM advertisement a 
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id`;
        return db.execute(query);
    }

    static getAdvertisementntById(id) {
        const query = `SELECT a.*, c.name AS customer_name, c.email, c.nic_number, c.phone_number, c.address, ut.name AS upgrade_type_name, ut.description, ut.price, ts.start AS start_time, ts.end AS end_time FROM advertisement a 
        INNER JOIN customer c ON a.customer_id = c.id
        INNER JOIN  upgrade_type ut ON a.upgrade_type_id = ut.id
        INNER JOIN  time_slot ts ON a.time_slot_id = ts.id WHERE a.id = '${id}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM advertisement WHERE id = '${id}'`;
        return db.execute(query);
    }



    create() {
        const query = `INSERT INTO advertisement (customer_id, vehicle_type, brand, model, year_of_manufacture, condition, description, price, is_sold) VALUE(?,?,?,?,?,?,?,?,?)`;
        return db.execute(query, [this.customer_id, this.vehicle_type, this.brand, this.model, this.year_of_manufacture, this.condition, this.description, this.price, this.is_sold]);
    }


    update(id, customer_id) {
        const query = `UPDATE advertisement set customer_id = ?,  vehicle_type = ?, brand = ?, model = ?, year_of_manufacture = ?,  condition = ?, description = ?, price = ?, is_sold = ? WHERE id = ?  AND customer_id = ? AND NOT is_sold = 1 `;
        return db.execute(query, [this.customer_id, this.vehicle_type, this.brand, this.model, this.year_of_manufacture, this.condition, this.description, this.price, this.is_sold, id, customer_id]);
    }

    

};

const db = require('../util/database');

module.exports = class Advertisementnt {
    constructor(advertisement) {
        this.vehicle_id = advertisement.vehicle_id;
        this.brand  = advertisement.brand;
        this.model  = advertisement.model ;
        this.manufactured_year  = advertisement.manufactured_year ;
        this.vehicle_condition = advertisement.vehicle_condition;
        this.transmission  = advertisement.transmission;
        this.fuel_type  = advertisement.fuel_type;
        this.engine_capacity  = advertisement.engine_capacity;
        this.mileage  = advertisement.mileage;
        this.seller_name  = advertisement.seller_name;
        this.city  = advertisement.city;
        this.price  = advertisement.price;
        this.contact_number  = advertisement.contact_number;
        this.is_sold  = advertisement.is_sold ;
    }

    static getAllAdvertisements() {
        const query = `SELECT a.*, v.customer_id, v.vehicle_type, v.vehicle_number, c.first_name, c.last_name, c.email FROM advertisement a 
        INNER JOIN vehicle v ON a.vehicle_id = v.id
        INNER JOIN  customer c ON v.customer_id = c.id WHERE a.is_sold = 0`;
        return db.execute(query);
    }

    static getAdvertisementById(id) {
        const query = `SELECT a.*, v.customer_id, v.vehicle_type, v.vehicle_number, c.first_name, c.last_name, c.email FROM advertisement a 
        INNER JOIN vehicle v ON a.vehicle_id = v.id
        INNER JOIN  customer c ON v.customer_id = c.id WHERE a.is_sold = 0 AND a.id = '${id}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM advertisement WHERE id = '${id}'`;
        return db.execute(query);
    }



    create() {
        const query = `INSERT INTO advertisement (vehicle_id, brand, model, manufactured_year, vehicle_condition, transmission, fuel_type, engine_capacity, mileage, seller_name, city, price, contact_number, is_sold) VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        return db.execute(query, [this.vehicle_id, this.brand, this.model, this.manufactured_year, this.vehicle_condition, this.transmission, this.fuel_type, this.engine_capacity, this.mileage, this.seller_name, this.city, this.price, this.contact_number, this.is_sold]);
    }


    update(id, customer_id) {
        const query = `UPDATE advertisement set vehicle_id = ?,  brand = ?, model = ?, manufactured_year = ?, vehicle_condition = ?,  transmission = ?, fuel_type = ?, engine_capacity = ?, mileage = ?, seller_name = ?, city = ?, price = ?, contact_number = ?, is_sold = ? WHERE id = ?  AND NOT is_sold = 1 `;
        return db.execute(query, [this.vehicle_id, this.brand, this.model, this.manufactured_year, this.vehicle_condition, this.transmission, this.fuel_type, this.engine_capacity, this.mileage, this.seller_name, this.city, this.price, this.contact_number, this.is_sold, id]);
    }


    static changeStatus(id) {
        const query = `UPDATE advertisement set is_sold = ? WHERE id = ?`;
        return db.execute(query, [1, id]);
    }
    

};

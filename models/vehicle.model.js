const db = require('../util/database');

module.exports = class Vehicle {
    constructor(vehicle) {
        this.customer_id = vehicle.customer_id;
        this.vehicle_type = vehicle.vehicle_type;
        this.vehicle_number = vehicle.vehicle_number;
    }

    static getAllVehicles() {
        const query = "SELECT v.*, c.first_name, c.last_name, c.email, c.contact_number, c.nic_number, c.is_completed FROM vehicle v INNER JOIN customer c ON c.id = v.customer_id";
        return db.execute(query);
    }

    static getVehicleById(id) {
        const query = `SELECT v.*, c.first_name, c.last_name, c.email, c.contact_number, c.nic_number, c.is_completed FROM vehicle v INNER JOIN customer c ON c.id = v.customer_id WHERE v.id = '${id}'`;
        return db.execute(query);
    }

    static getVehiclesByCustomerId(customer_id) {
        const query = `SELECT v.*, c.first_name, c.last_name, c.email, c.contact_number, c.nic_number, c.is_completed FROM vehicle v INNER JOIN customer c ON c.id = v.customer_id WHERE v.customer_id = '${customer_id}'`;
        return db.execute(query);
    }

    static getNotAdvertisedVehiclesByCustomerId(customer_id) {
        const query = `SELECT v.* FROM vehicle v LEFT JOIN advertisement a ON v.id = a.vehicle_id
        WHERE a.vehicle_id IS NULL AND v.customer_id = '${customer_id}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM vehicle WHERE id = '${id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO vehicle (customer_id, vehicle_type, vehicle_number) VALUE(?,?,?)`;
        return db.execute(query, [this.customer_id, this.vehicle_type, this.vehicle_number]);
    }


    update(id) {
        const query = `UPDATE vehicle set customer_id = ?, vehicle_type = ?, vehicle_number = ? WHERE id = ? `;
        return db.execute(query, [this.customer_id, this.vehicle_type, this.vehicle_number, id]);
    }

};

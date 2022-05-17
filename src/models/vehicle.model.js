const db = require('../util/database');

module.exports = class Vehicle {
    constructor(vehicle) {
        this.customer_id = vehicle.customer_id;
        this.type = vehicle.type;
        this.number = vehicle.number;
    }

    static getAllVehicles() {
        const query = "SELECT * FROM vehicle";
        return db.execute(query);
    }

    static getVehicleById(id) {
        const query = `SELECT * FROM vehicle WHERE id = '${id}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM vehicle WHERE id = '${id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO vehicle (customer_id, type, number) VALUE(?,?,?)`;
        return db.execute(query, [this.customer_id, this.type, this.number]);
    }


    update(id) {
        const query = `UPDATE vehicle set customer_id = ?, type = ?, number = ? WHERE id = ? `;
        return db.execute(query, [this.customer_id, this.type, this.number, id]);
    }

};

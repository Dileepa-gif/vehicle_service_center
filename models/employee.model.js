const db = require('../util/database');

module.exports = class Employee {
    constructor(employee) {
        this.name = employee.name;
        this.email = employee.email;
        this.hash = employee.hash;
        this.salt = employee.salt;
        this.nic_number = employee.nic_number;
        this.phone_number = employee.phone_number;
        this.address = employee.address;
    }

    static getAllEmployees() {
        const query = "SELECT * FROM employee";
        return db.execute(query);
    }

    static getEmployeeById(id) {
        const query = `SELECT * FROM employee WHERE id = '${id}'`;
        return db.execute(query);
    }

    static getEmployeeByEmail(email) {
        const query = `SELECT * FROM employee WHERE email = '${email}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM employee WHERE id = '${id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO employee (name, email, hash, salt, nic_number, phone_number, address) VALUE(?,?,?,?,?,?,?)`;
        return db.execute(query, [this.name, this.email, this.hash, this.salt, this.nic_number, this.phone_number, this.address]);
    }


    update(id) {
        const query = `UPDATE employee set name = ?, email = ?, hash = ?, salt = ?,  nic_number = ?, phone_number = ?, address = ?  WHERE id = ? `;
        return db.execute(query, [this.name, this.email, this.hash, this.salt, this.nic_number, this.phone_number, this.address, id]);
    }

};

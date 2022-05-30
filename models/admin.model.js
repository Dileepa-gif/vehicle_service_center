const db = require('../util/database');

module.exports = class Admin {
    constructor(admin) {
        this.first_name = employee.first_name;
        this.last_name = employee.last_name;
        this.email = employee.email;
        this.hash = employee.hash;
        this.salt = employee.salt;
        this.nic_number = employee.nic_number;
        this.phone_number = employee.phone_number;
        this.address = employee.address;
    }

    static getAllAdmins() {
        const query = "SELECT * FROM admin";
        return db.execute(query);
    }

    static getAdminById(id) {
        const query = `SELECT * FROM admin WHERE id = '${id}'`;
        return db.execute(query);
    }

    static getAdminByEmail(email) {
        const query = `SELECT * FROM admin WHERE email = '${email}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM admin WHERE id = '${id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO admin (first_name, last_name, email, hash, salt, nic_number, phone_number, address) VALUE(?,?,?,?,?,?,?,?)`;
        return db.execute(query, [this.first_name, this.last_name, this.email, this.hash, this.salt, this.nic_number, this.phone_number, this.address]);
    }


    update(id) {
        const query = `UPDATE admin set first_name = ?, last_name = ?, email = ?, hash = ?, salt = ?,  nic_number = ?, phone_number = ?, address = ?  WHERE id = ? `;
        return db.execute(query, [this.first_name, this.last_name, this.email, this.hash, this.salt, this.nic_number, this.phone_number, this.address, id]);
    }

};

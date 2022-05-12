const db = require('../util/database');

module.exports = class Admin {
    constructor(admin) {
        this.name = admin.name;
        this.email = admin.email;
        this.hash = admin.hash;
        this.salt = admin.salt;
        this.nic_number = admin.nic_number;
        this.phone_number = admin.phone_number;
        this.address = admin.address;
    }

    static getAllAdmins() {
        const query = "SELECT * FROM admin";
        return db.execute(query);
    }

    static getAdminById(id) {
        const query = `SELECT * FROM admin where id = '${id}'`;
        return db.execute(query);
    }

    static getAdminByEmail(email) {
        const query = `SELECT * FROM admin where email = '${email}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM admin WHERE id = '${id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO admin (name, email, hash, salt, nic_number, phone_number, address) VALUE(?,?,?,?,?,?,?)`;
        return db.execute(query, [this.name, this.email, this.hash, this.salt, this.nic_number, this.phone_number, this.address]);
    }


    update(id) {
        const query = `UPDATE admin set name = ?, email = ?, hash = ?, salt = ?,  nic_number = ?, phone_number = ?, address = ?  WHERE id = ? `;
        return db.execute(query, [this.name, this.email, this.hash, this.salt, this.nic_number, this.phone_number, this.address, id]);
    }

};

const db = require('../util/database');

module.exports = class Customer {
    constructor(customer) {
        this.name = customer.name;
        this.email = customer.email;
        this.hash = customer.hash;
        this.salt = customer.salt;
        this.nic_number = customer.nic_number;
        this.phone_number = customer.phone_number;
        this.address = customer.address;
    }

    static getAllCustomers() {
        const query = "SELECT * FROM customer";
        return db.execute(query);
    }

    static getCustomerById(id) {
        const query = `SELECT * FROM customer where id = '${id}'`;
        return db.execute(query);
    }

    static getCustomerByEmail(email) {
        const query = `SELECT * FROM customer where email = '${email}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM customer WHERE id = '${id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO customer (name, email, hash, salt, nic_number, phone_number, address) VALUE(?,?,?,?,?,?,?)`;
        return db.execute(query, [this.name, this.email, this.hash, this.salt, this.nic_number, this.phone_number, this.address]);
    }


    update(id) {
        const query = `UPDATE customer set name = ?, email = ?, hash = ?, salt = ?,  nic_number = ?, phone_number = ?, address = ?  WHERE id = ? `;
        return db.execute(query, [this.name, this.email, this.hash, this.salt, this.nic_number, this.phone_number, this.address, id]);
    }

};

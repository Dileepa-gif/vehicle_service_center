const db = require('../util/database');

module.exports = class Customer {
    constructor(customer) {
        this.first_name = customer.first_name;
        this.last_name = customer.last_name;
        this.email = customer.email;
        this.hash = customer.hash;
        this.salt = customer.salt;
        this.contact_number = customer.contact_number;
        this.nic_number = customer.nic_number;
        this.is_completed = customer.is_completed;
    }

    static getAllCustomers() {
        const query = "SELECT * FROM customer";
        return db.execute(query);
    }

    static getCustomerById(id) {
        const query = `SELECT * FROM customer WHERE id = '${id}'`;
        return db.execute(query);
    }

    static getCustomerByEmail(email) {
        const query = `SELECT * FROM customer WHERE email = '${email}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM customer WHERE id = '${id}'`;
        return db.execute(query);
    }

    
    create() {
        const query = `INSERT INTO customer (first_name, last_name, email, hash, salt, contact_number, nic_number, is_completed) VALUE(?,?,?,?,?,?,?,?)`;
        return db.execute(query, [this.first_name, this.last_name, this.email, this.hash, this.salt, this.contact_number, this.nic_number, this.is_completed]);
    }


    update(id) {
        const query = `UPDATE customer set first_name = ?, last_name = ?, hash = ?, salt = ?,  contact_number = ?, nic_number = ?,  is_completed = ?  WHERE id = ? `;
        return db.execute(query, [this.first_name, this.last_name, this.hash, this.salt, this.contact_number, this.nic_number,  this.is_completed, id]);
    }

};

const db = require('../util/database');

module.exports = class UpgradeType {
    constructor(upgrade_type) {
        this.name = upgrade_type.name;
        this.description = upgrade_type.description;
        this.price = upgrade_type.price;
    }

    static getAllUpgradeTypes() {
        const query = "SELECT * FROM upgrade_type";
        return db.execute(query);
    }

    static getUpgradeTypeById(id) {
        const query = `SELECT * FROM upgrade_type where id = '${id}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM upgrade_type WHERE id = '${id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO upgrade_type (name, description, price) VALUE(?,?,?)`;
        return db.execute(query, [this.name, this.description, this.price]);
    }


    update(id) {
        const query = `UPDATE upgrade_type set name = ?, description = ?, price = ? WHERE id = ? `;
        return db.execute(query, [this.name, this.description, this.price, id]);
    }

};

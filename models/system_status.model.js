const db = require('../util/database');

module.exports = class SystemStatus {
    constructor(system_status) {
        this.id = system_status.id;
        this.is_active = system_status.is_active;
    }

    static getSystemStatus() {
        const query = `SELECT * FROM system_status WHERE id = 1`;
        return db.execute(query);
    }


    update() {
        const query = `UPDATE system_status set is_active = ? WHERE id = 1 `;
        return db.execute(query, [this.is_active]);
    }

};

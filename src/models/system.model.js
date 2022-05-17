const db = require('../util/database');

module.exports = class System {
    constructor(system) {
        this.id = system.id;
        this.is_active = system.is_active;
    }

    static getSystem() {
        const query = `SELECT * FROM system WHERE id = 1`;
        return db.execute(query);
    }


    update() {
        const query = `UPDATE system set is_active = ? WHERE id = 1 `;
        return db.execute(query, [this.is_active]);
    }

};

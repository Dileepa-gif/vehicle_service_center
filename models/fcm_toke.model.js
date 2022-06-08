const db = require('../util/database');

module.exports = class FCMToken {
    constructor(fcm_token) {
        this.customer_id = fcm_token.customer_id;
        this.fcm_token = fcm_token.fcm_token;
    }

    static getFCMTokensByCustomerId(customer_id, fcm_token) {
        const query = `SELECT fcm_token FROM fcm_token where customer_id = ${customer_id}`;
        return db.execute(query);
    }

    static getFCMTokenById(id) {
        const query = `SELECT * FROM fcm_token WHERE id = '${id}'`;
        return db.execute(query);
    }

    static deleteByFCMToken(fcm_token) {
        const query = `DELETE FROM fcm_token WHERE fcm_token = '${fcm_token}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO fcm_token (customer_id, fcm_token) VALUE(?,?)`;
        return db.execute(query, [this.customer_id, this.fcm_token]);
    }


};

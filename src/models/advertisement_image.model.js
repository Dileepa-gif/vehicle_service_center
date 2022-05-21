const db = require('../util/database');

module.exports = class AdvertisementImage {
    constructor(advertisement_image) {
        this.advertisement_id = advertisement_image.advertisement_id;
        this.image = advertisement_image.image;
    }

    static getAllAdvertisementImages() {
        const query = "SELECT * FROM advertisement_image";
        return db.execute(query);
    }

    static getAdvertisementImageById(id) {
        const query = `SELECT * FROM advertisement_image WHERE id = '${id}'`;
        return db.execute(query);
    }
    
    static getAdvertisementImagesByAdvertisementId(advertisement_id) {
        const query = `SELECT * FROM advertisement_image WHERE advertisement_id = '${advertisement_id}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM advertisement_image WHERE id = '${id}'`;
        return db.execute(query);
    }

    static deleteByAdvertisementId(advertisement_id) {
        const query = `DELETE FROM advertisement_image WHERE advertisement_id = '${advertisement_id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO advertisement_image (advertisement_id, image) VALUE(?,?)`;
        return db.execute(query, [this.advertisement_id, this.image]);
    }


    update(id) {
        const query = `UPDATE advertisement_image set advertisement_id = ?, image = ? WHERE id = ? `;
        return db.execute(query, [this.advertisement_id, this.image, id]);
    }

};

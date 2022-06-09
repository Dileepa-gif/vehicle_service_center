const db = require('../util/database');

module.exports = class Carousel {
    constructor(carousel) {
        this.image = carousel.image;
    }

    static getAllCarousels() {
        const query = "SELECT * FROM carousel";
        return db.execute(query);
    }

    static getCarouselById(id) {
        const query = `SELECT * FROM carousel WHERE id = '${id}'`;
        return db.execute(query);
    }

    static delete(id) {
        const query = `DELETE FROM carousel WHERE id = '${id}'`;
        return db.execute(query);
    }

    create() {
        const query = `INSERT INTO carousel (image) VALUE(?)`;
        return db.execute(query, [this.image]);
    }


    update(id) {
        const query = `UPDATE carousel set image = ? WHERE id = ? `;
        return db.execute(query, [this.image, id]);
    }

};

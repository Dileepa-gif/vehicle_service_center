const db = require('../util/database');

module.exports = class TimeSlot {
    constructor(time_slot) {
        this.start = time_slot.start;
        this.end = time_slot.end;
        this.number_of_vehicles = time_slot.number_of_vehicles;
    }

    static getAllTimeSlots() {
        const query = "SELECT * FROM time_slot";
        return db.execute(query);
    }

    static getTimeSlotById(id) {
        const query = `SELECT * FROM time_slot WHERE id = '${id}'`;
        return db.execute(query);
    }

    // static getTimeSlotByHour(hour) {
    //     const query = `SELECT *  FROM time_slot WHERE start <= '${hour}' AND  end > '${hour}' `;
    //     return db.execute(query);
    // }

    update(id) {
        const query = `UPDATE time_slot set start = ?, end = ?, number_of_vehicles = ? WHERE id = ? `;
        return db.execute(query, [this.start, this.end, this.number_of_vehicles,id]);
    }

};

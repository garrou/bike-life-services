const validator = require('../utils/validator');

class Bike {

    /**
     * @param {String} id
     * @param {String} name 
     * @param {Number} kmPerWeek 
     * @param {Number} nbUsedPerWeek
     * @param {Boolean} electric
     * @param {String} type
     * @param {Date} addedAt
     */
    constructor(id, name, kmPerWeek, nbUsedPerWeek, electric, type, addedAt) {
        this.id = id;
        this.name = name;
        this.kmPerWeek = kmPerWeek;
        this.nbUsedPerWeek = parseInt(nbUsedPerWeek);
        this.electric = electric;
        this.type = type;
        this.addedAt = addedAt;
    }

    /**
     * @returns {Boolean}
     */
    isValid = () => {
        return validator.isDate(this.addedAt) 
            && validator.isKm(this.kmPerWeek)
            && validator.isWeekDay(this.nbUsedPerWeek);
    }

    /**
     * @param {JSON} json 
     * @returns Bike
     */
    static fromJson = (json) => {
        return new Bike(json.id, 
                        json.name, 
                        json.kmPerWeek, 
                        parseInt(json.nbUsedPerWeek), 
                        json.electric, 
                        json.type, 
                        json.addedAt);
    }

    /**
     * @param {Array} records 
     * @returns Array<Bike>
     */
    static createFromList = (records) => {
        return records
                .map((bike) => new Bike(bike.bike_id, 
                                        bike.name, 
                                        bike.average_km_week, 
                                        bike.average_use_week, 
                                        bike.electric,
                                        bike.bike_type,
                                        bike.added_at));
    }
}

module.exports = Bike;
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
     * @param {Number} totalKm
     */
    constructor(id, name, kmPerWeek, nbUsedPerWeek, electric, type, addedAt, totalKm) {
        this.id = id;
        this.name = name;
        this.kmPerWeek = kmPerWeek;
        this.nbUsedPerWeek = parseInt(nbUsedPerWeek);
        this.electric = electric;
        this.type = type;
        this.addedAt = addedAt;
        this.totalKm = totalKm;
    }

    /**
     * @returns {Boolean}
     */
    isValid = () => validator.isDate(this.addedAt) 
                    && validator.isKm(this.kmPerWeek)
                    && validator.isWeekDay(this.nbUsedPerWeek)
                    && validator.isValidName(this.name);
    

    /**
     * @param {JSON} json 
     * @returns {Bike}
     */
    static fromJson = (json) => new Bike(json.id, 
                                        json.name, 
                                        json.kmPerWeek, 
                                        parseInt(json.nbUsedPerWeek), 
                                        json.electric, 
                                        json.type, 
                                        json.addedAt,
                                        0);
    

    /**
     * @param {Array} records 
     * @returns {Array<Bike>}
     */
    static createFromList = (records) => records
                                            .map((bike) => new Bike(bike.bike_id, 
                                                                    bike.name, 
                                                                    bike.average_km_week, 
                                                                    bike.average_use_week, 
                                                                    bike.electric,
                                                                    bike.bike_type,
                                                                    bike.added_at,
                                                                    bike.total_km));
}

module.exports = Bike;
const Generator = require('../utils/Generator');
const validator = require('../utils/Validator');

class Bike {

    /**
     * @param {String} id
     * @param {String} name 
     * @param {Number} kmPerWeek 
     * @param {Boolean} electric
     * @param {String} type
     * @param {Date} addedAt
     * @param {Number} totalKm
     * @param {Boolean} automaticKm
     */
    constructor(id, name, kmPerWeek, electric, type, addedAt, totalKm, automaticKm) {
        this.id = id;
        this.name = name;
        this.kmPerWeek = parseFloat(kmPerWeek);
        this.electric = electric;
        this.type = type;
        this.addedAt = addedAt;
        this.totalKm = parseFloat(totalKm);
        this.automaticKm = automaticKm;
    }

    /**
     * @returns {Boolean}
     */
    isValid = () => validator.isDate(this.addedAt) 
                    && validator.isKm(this.kmPerWeek)
                    && validator.isKm(this.totalKm)
                    && validator.isValidName(this.name);
    

    /**
     * @param {JSON} json 
     * @returns {Bike}
     */
    static fromJson = (json) => new Bike(json.id === '' ? Generator.uuid() : json.id, 
                                        json.name, 
                                        json.kmPerWeek, 
                                        json.electric, 
                                        json.type, 
                                        json.addedAt,
                                        json.totalKm,
                                        json.automaticKm);
    
    /**
     * @param {Array} records 
     * @returns {Array<Bike>}
     */
    static fromList = (records) => {
        return records
                .map((bike) => new Bike(bike.bike_id, 
                                        bike.name, 
                                        bike.average_km_week, 
                                        bike.electric,
                                        bike.bike_type,
                                        bike.added_at,
                                        bike.total_km,
                                        bike.automatic_km));
    }
}

module.exports = Bike;
const Utils = require('../utils/Utils');
const validator = require('../utils/Validator');

class Bike {

    /**
     * @param {String} id
     * @param {String} name 
     * @param {String} kmPerWeek 
     * @param {Boolean} electric
     * @param {String} type
     * @param {String} addedAt
     * @param {String} totalKm
     * @param {Boolean} automaticKm
     * @param {String} price
     */
    constructor(id, name, kmPerWeek, electric, type, addedAt, totalKm, automaticKm, price) {
        this.id = id;
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.kmPerWeek = parseFloat(kmPerWeek);
        this.electric = electric;
        this.type = type;
        this.addedAt = addedAt;
        this.totalKm = parseFloat(totalKm);
        this.automaticKm = automaticKm;
        this.price = parseFloat(price);
    }

    /**
     * @returns {Boolean}
     */
    isValid = () => validator.isDate(this.addedAt)
                    && validator.isNumber(this.kmPerWeek)
                    && validator.isNumber(this.totalKm)
                    && validator.isValidName(this.name)
                    && validator.isBikeType(this.type)
                    && validator.isNumber(this.price)
                    && validator.isUUID(this.id);
    
    /**
     * @param {JSON} json 
     * @returns {Bike}
     */
    static fromJson = (json) => new this(json.id === '' ? Utils.uuid() : json.id, 
                                        json.name, 
                                        json.kmPerWeek, 
                                        json.electric, 
                                        json.type, 
                                        json.addedAt,
                                        json.totalKm,
                                        json.automaticKm,
                                        json.price);
    
    /**
     * @param {Array} records 
     * @returns {Array<Bike>}
     */
    static fromList = (records) => {
        return records
                .map((bike) => new this(bike.bike_id, 
                                        bike.name, 
                                        bike.average_km_week, 
                                        bike.electric,
                                        bike.bike_type,
                                        bike.added_at,
                                        bike.total_km,
                                        bike.automatic_km,
                                        bike.price));
    }
}

module.exports = Bike;
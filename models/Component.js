const Validator = require('../utils/Validator');
const constants = require('../constants/constants.json');

class Component {

    /**
     * @param {String} id
     * @param {String} duration
     * @param {String} type
     * @param {Boolean} active
     * @param {Date} changedAt
     * @param {String} totalKm
     * @param {String} brand
     * @param {String} price
     */
    constructor(id, duration, type, active, changedAt, totalKm, brand, price) {
        this.id = id;
        this.duration = parseFloat(duration);
        this.type = type;
        this.active = active;
        this.changedAt = changedAt;
        this.totalKm = parseFloat(totalKm);
        this.brand = brand.charAt(0).toUpperCase() + brand.slice(1);
        this.price = parseFloat(price);
    }

    isValid = () => Validator.isValidLength(this.brand, constants.BRAND_MIN_SIZE, constants.BRAND_MAX_SIZE)
                    && Validator.isNumber(this.price);

    /**
     * @param {Array<JSON>} records
     * @returns {Array<Component>} 
     */
    static fromList = (records) => {
        return records
                .map((compo) => new this(compo['component_id'],
                                        compo['duration'],
                                        compo['fk_component_type'],
                                        compo['active'],
                                        compo['changed_at'],
                                        compo['total_km'],
                                        compo['brand'],
                                        compo['price']));
    }

    /**
     * @param {JSON} json
     * @returns {Component}
     */
    static fromJson = (json) => {
        return new this(json['id'],
                            json['duration'],
                            json['type'],
                            json['active'],
                            json['changedAt'],
                            json['totalKm'],
                            json['brand'],
                            json['price']);
    }
}

module.exports = Component;
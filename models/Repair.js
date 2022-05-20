const Validator = require('../utils/Validator');
const constants = require('../constants/constants.json');

class Repair {

    /**
     * @param {Number} id
     * @param {Date} repairAt
     * @param {String} reason
     * @param {String} price
     * @param {String} componentId
     */
    constructor(id, repairAt, reason, price, componentId) {
        this.id = id;
        this.repairAt = repairAt;
        this.reason = reason.slice(0, constants.REASON_MAX_SIZE);
        this.price = parseFloat(price);
        this.componentId = componentId;
    }

    /**
     * @param {JSON} json
     * @returns Repair
     */
    static fromJson = (json) => {
        return new this(json['id'],
                        json['repairAt'],
                        json['reason'],
                        json['price'],
                        json['componentId']);
    }

    /**
     * @param {Array<JSON>} records
     * @returns {Array<Repair>}
     */
    static fromList = (records) => {
        return records.map(record => new this(record['id'],
                                            record['repair_at'],
                                            record['reason'],
                                            record['price'],
                                            record['fk_component']));
    }

    /**
     * @returns {Boolean}
     */
    isValid = () => Validator.isNumber(this.price)
                    && Validator.isDate(this.repairAt)
                    && Validator.isValidLength(this.reason, 0, constants.REASON_MAX_SIZE)
                    && Validator.isUUID(this.componentId);
}

module.exports = Repair;
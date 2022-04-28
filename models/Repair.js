class Repair {

    /**
     * @param {Number} id
     * @param {Date} repairAt
     * @param {String} reason
     * @param {Number} price
     * @param {String} component
     */
    constructor(id, repairAt, reason, price, component) {
        this.id = id;
        this.repairAt = repairAt;
        this.reason = reason;
        this.price = price;
        this.component = component;
    }

    /**
     * @param {JSON} json
     * @returns Repair
     */
    static fromJson = (json) => {
        return new this(json['id'],
                        json['repair_at'],
                        json['reason'],
                        json['price'],
                        json['component']);
    }
}

module.exports = Repair;
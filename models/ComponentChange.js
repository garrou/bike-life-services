class ComponentChange {

    /**
     * @param {String} changedAt
     * @param {String} kmRealised 
     * @param {String} price
     * @param {String} brand
     */
    constructor(changedAt, kmRealised, price, brand) {
        this.changedAt = changedAt;
        this.kmRealised = parseFloat(kmRealised);
        this.price = parseFloat(price);
        this.brand = brand.charAt(0).toUpperCase() + brand.slice(1);
    }

    /**
     * @param {Array<JSON>} records
     * @returns {Array<ComponentChange>}
     */
    static fromList = (records) => {
        return records
                .map((compo) => new this(compo['changed_at'],
                                        compo['km_realised'],
                                        compo['price'],
                                        compo['brand']));
    }

    /**
     * @param {JSON} json 
     * @returns {ComponentChange}
     */
    static fromJson = (json) => {
        return new this(json['changedAt'],
                        json['kmRealised'],
                        json['price'],
                        json['brand']);
    }
}

module.exports = ComponentChange;
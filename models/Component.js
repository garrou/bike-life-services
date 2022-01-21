class Component {

    /**
     * @param {int} id
     * @param {int} bikeId 
     * @param {String} brand 
     * @param {int} km 
     * @param {String} dateOfPurchase
     * @param {int} duration 
     * @param {String} image
     * @param {String} type
     */
    constructor(id, bikeId, brand, km, dateOfPurchase, duration, image, type) {
        this.id = id;
        this.bikeId = bikeId;
        this.brand = brand;
        this.km = parseFloat(km);
        this.dateOfPurchase = dateOfPurchase;
        this.duration = parseFloat(duration);
        this.image = image;
        this.type = type;
    }

    /**
     * @param {Array} records 
     * @returns Array<Component> 
     */
    static createFromList(records) {
        return records
            .map((compo) => new Component(compo.component_id, 
                                            compo.fk_bike, 
                                            compo.brand, 
                                            compo.nb_km,
                                            compo.date_of_purchase,
                                            compo.duration,
                                            compo.image, 
                                            compo.component_type));
    }
}

module.exports = Component;
class Component {

    /**
     * @param {Number} id
     * @param {Number} bikeId 
     * @param {String} brand 
     * @param {Number} km 
     * @param {Date} dateOfPurchase
     * @param {Number} duration 
     * @param {String} image
     * @param {String} type
     * @param {Boolean} archived
     */
    constructor(id, bikeId, brand, km, dateOfPurchase, duration, image, type, archived) {
        this.id = id;
        this.bikeId = bikeId;
        this.brand = brand;
        this.km = km;
        this.dateOfPurchase = dateOfPurchase;
        this.duration = duration;
        this.image = image;
        this.type = type;
        this.archived = archived;
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
                                            compo.component_type,
                                            compo.archived));
    }
}

module.exports = Component;
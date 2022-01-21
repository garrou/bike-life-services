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
        this.dateOfPurchase = dateOfPurchase;
        this.km = km;
        this.duration = duration;
        this.image = image;
        this.type = type;
    }
}

module.exports = Component;
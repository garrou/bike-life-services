class Bike {

    /**
     * @param {int} id
     * @param {String} name 
     * @param {String} image 
     * @param {Date} date_of_purchase
     * @param {int} nbKm
     */
    constructor(id, name, image, dateOfPurchase, nbKm) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.dateOfPurchase = dateOfPurchase;
        this.nbKm = nbKm;
    }
}

module.exports = Bike;
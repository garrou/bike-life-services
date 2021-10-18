class Bike {

    /**
     * @param {int} id
     * @param {String} name 
     * @param {String} description 
     * @param {String} image 
     * @param {Date} date_of_purchase
     * @param {int} nbKm
     */
    constructor(id, name, description, image, dateOfPurchase, nbKm) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.dateOfPurchase = dateOfPurchase;
        this.nbKm = nbKm;
    }
}

module.exports = Bike;
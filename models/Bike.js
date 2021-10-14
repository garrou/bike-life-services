class Bike {

    /**
     * @param {int} id
     * @param {String} name 
     * @param {String} description 
     * @param {String} image 
     * @param {String} date_of_purchase
     */
    constructor(id, name, description, image, dateOfPurchase) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.dateOfPurchase = dateOfPurchase;
    }
}

module.exports = Bike;
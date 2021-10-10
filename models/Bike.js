class Bike {

    /**
     * @param {int} id
     * @param {String} name 
     * @param {String} description 
     * @param {String} image 
     */
    constructor(id, name, description, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }
}

module.exports = Bike;
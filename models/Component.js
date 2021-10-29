class Component {

    /**
     * @param {int} id 
     * @param {String} brand 
     * @param {String} field
     * @param {int} km 
     * @param {int} duration 
     */
    constructor(id, brand, field, km, duration) {
        this.id = id;
        this.brand = brand;
        this.field = field;
        this.km = km;
        this.duration = duration;
    }
}

module.exports = Component;
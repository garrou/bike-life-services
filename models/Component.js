class Component {

    /**
     * @param {Number} id
     * @param {Number} duration 
     * @param {String} type
     */
    constructor(id, duration, type) {
        this.id = id;
        this.duration = duration;
        this.type = type;
    }

    /**
     * @param {Array} records 
     * @returns Array<Component> 
     */
    static createFromList(records) {
        return records
            .map((compo) => new Component(compo.component_id, 
                                            compo.duration,
                                            compo.fk_component_type));
    }
}

module.exports = Component;
class Component {

    /**
     * @param {Number} id
     * @param {Number} duration 
     * @param {String} type
     */
    constructor(id, duration, type, lastRevision) {
        this.id = id;
        this.duration = duration;
        this.type = type;
        this.lastRevision = lastRevision;
    }

    /**
     * @param {Array} records 
     * @returns Array<Component> 
     */
    static createFromList(records) {
        return records
            .map((compo) => new Component(compo.component_id, 
                                            compo.duration,
                                            compo.fk_component_type,
                                            compo.made_at));
    }
}

module.exports = Component;
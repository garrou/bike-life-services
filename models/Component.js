class Component {

    /**
     * @param {Number} id
     * @param {Number} duration 
     * @param {String} type
     * @param {Boolean} active
     * @param {Date} changedAt
     */
    constructor(id, duration, type, active, changedAt) {
        this.id = id;
        this.duration = duration;
        this.type = type;
        this.active = active;
        this.changedAt = changedAt;
    }

    /**
     * @param {Array} records 
     * @returns Array<Component> 
     */
    static createFromList = (records) => {
        return records.map((compo) => new Component(compo.component_id, 
                                                    compo.duration,
                                                    compo.fk_component_type,
                                                    compo.active,
                                                    compo.changed_at));
    }
}

module.exports = Component;
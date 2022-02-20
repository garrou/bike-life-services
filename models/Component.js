class Component {

    /**
     * @param {Number} id
     * @param {Number} duration 
     * @param {String} type
     * @param {Boolean} active
     * @param {Date} changedAt
     * @param {Number} totalKm
     */
    constructor(id, duration, type, active, changedAt, totalKm) {
        this.id = id;
        this.duration = parseFloat(duration);
        this.type = type;
        this.active = active;
        this.changedAt = changedAt;
        this.totalKm = parseFloat(totalKm);
    }

    /**
     * @param {Array} records 
     * @returns {Array<Component>} 
     */
    static fromList = (records) => {
        return records
                .map((compo) => new Component(compo.component_id, 
                                            compo.duration,
                                            compo.fk_component_type,
                                            compo.active,
                                            compo.changed_at,
                                            compo.total_km));
    }
}

module.exports = Component;
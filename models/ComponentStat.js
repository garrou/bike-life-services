class ComponentStat {

    /**
     * @param {String} label
     * @param {String} value
     */
    constructor(label, value) {
        this.label = label.toString();
        this.value = parseFloat(value);
    }

    /**
     * @param {Array<JSON>} records
     * @returns {Array<ComponentStat>}
     */
    static fromList = (records) => {
        return records
                .map((compo) => new this(compo['label'], compo['value']));
    }
}

module.exports = ComponentStat;
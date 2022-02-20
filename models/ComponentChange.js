class ComponentChange {

    /**
     * @param {} label
     * @param {} value 
     */
    constructor(label, value) {
        this.label = label.toString();
        this.value = parseFloat(value);
    }

    /**
     * @param {Array} records 
     * @returns {Array<Component>} 
     */
    static fromList = (records) => {
        return records
                .map((compo) => new ComponentChange(compo.label, compo.value));
    }
}

module.exports = ComponentChange;
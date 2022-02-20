class ComponentHistoric {

    /**
     * @param {} label
     * @param {} value 
     */
    constructor(label, value) {
        this.label = label;
        this.value = parseFloat(value);
    }

    /**
     * @param {Array} records 
     * @returns {Array<Component>} 
     */
    static fromList = (records) => {
        return records
                .map((compo) => new ComponentHistoric(compo.label, compo.value));
    }
}

module.exports = ComponentHistoric;
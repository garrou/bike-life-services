class ComponentChange {

    /**
     * @param {} label
     * @param {} value 
     */
    constructor(label, value) {
        this.label = label;
        this.value = value;
    }

    /**
     * @param {Array} records 
     * @returns Array<Component> 
     */
    static createFromList = (records) => records
                                            .map((compo) => new ComponentChange(compo.label, 
                                                                                compo.value));
    
}

module.exports = ComponentChange;
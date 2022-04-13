class Diagnostic {

    /**
     * @param {Number} id
     * @param {String}title
     * @param {String} type
     * @param {String} component
     * @param {String} content
     */
    constructor(id, title, type, component, content) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.component = component;
        this.content = content;
    }

    /**
     * @param {Array<JSON>} records
     * @returns {Array<Diagnostic>}
     */
    static fromList = (records) => {
        return records
                .map((diagnostic) => new this(diagnostic['id'],
                                            diagnostic['title'],
                                            diagnostic['bike_type'],
                                            diagnostic['component'],
                                            diagnostic['content']));
    }
}

module.exports = Diagnostic;
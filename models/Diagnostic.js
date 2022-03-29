class Diagnostic {

    constructor(id, title, type, component, content) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.component = component;
        this.content = content;
    }

    static fromList = (records) => {
        return records
                .map((diagnostic) => new Diagnostic(diagnostic.id, 
                                                    diagnostic.title, 
                                                    diagnostic.bike_type, 
                                                    diagnostic.component, 
                                                    diagnostic.content));
    }
}

module.exports = Diagnostic;
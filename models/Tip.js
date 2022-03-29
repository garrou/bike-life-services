class Tip {

    /**
     * @param {Number} id 
     * @param {String} type 
     * @param {String} title 
     * @param {String} content 
     */
    constructor(id, type, title, content, date) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.content = content;
    }

    /**
     * @param {Array} records 
     * @returns {Array<Tip>}
     */
    static fromList = (records) => {
        return records
                .map((tip) => new Tip(tip.tip_id,
                                    tip.fk_topic,
                                    tip.title,
                                    tip.content));
        }
}

module.exports = Tip;
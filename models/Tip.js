class Tip {

    /**
     * @param {Number} id 
     * @param {String} type 
     * @param {String} title 
     * @param {String} content 
     * @param {Date} date 
     */
    constructor(id, type, title, content, date) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.content = content;
        this.date = date;
    }

    /**
     * @param {Array} records 
     * @returns Array<Tip>
     */
    static createFromList = (records) => records
                                        .map((tip) => new Tip(tip.tip_id,
                                                            tip.fk_topic,
                                                            tip.title,
                                                            tip.content,
                                                            tip.write_date));
    
}

module.exports = Tip;
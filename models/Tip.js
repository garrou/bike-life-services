class Tip {

    /**
     * @param {int} id 
     * @param {String} type 
     * @param {String} title 
     * @param {String} content 
     * @param {int} voteUp 
     * @param {int} voteDown 
     * @param {Date} date 
     */
    constructor(id, type, title, content, voteUp, voteDown, date) {
        this.id = parseInt(id);
        this.type = type;
        this.title = title;
        this.content = content;
        this.voteUp = parseInt(voteUp);
        this.voteDown = parseInt(voteDown);
        this.date = date;
    }

    /**
     * @param {Array} records 
     * @returns Array<Tip>
     */
    static createFormList(records) {
        return records.map((tip) => new Tip(tip.tip_id,
                                            tip.component_type,
                                            tip.title,
                                            tip.content,
                                            tip.voteUp,
                                            tip.voteDown,
                                            tip.write_date));
    }
}
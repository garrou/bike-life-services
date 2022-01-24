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
        this.id = id;
        this.type = type;
        this.title = title;
        this.content = content;
        this.voteUp = voteUp;
        this.voteDown = voteDown;
        this.date = date;
    }

    /**
     * @param {Array} records 
     * @returns Array<Tip>
     */
    static createFromList(records) {
        return records.map((tip) => new Tip(tip.tip_id,
                                            tip.component_type,
                                            tip.title,
                                            tip.content,
                                            tip.vote_up,
                                            tip.vote_down,
                                            tip.write_date));
    }
}

module.exports = Tip;
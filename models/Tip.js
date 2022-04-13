class Tip {

    /**
     * @param {Number} id 
     * @param {String} type 
     * @param {String} title 
     * @param {String} content 
     * @param {String} video
     */
    constructor(id, type, title, content, video) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.content = content;
        this.video = video && video.slice(0, 11);
    }

    /**
     * @param {Array<JSON>} records
     * @returns {Array<Tip>}
     */
    static fromList = (records) => {
        return records
                .map((tip) => new this(tip['tip_id'],
                                    tip['fk_topic'],
                                    tip['title'],
                                    tip['content'],
                                    tip['video_id']));
        }
}

module.exports = Tip;
class Change {

    /**
     * @param {Date} changeAt 
     * @param {Number} km 
     */
    constructor(changedAt, km) {
        this.changedAt = changedAt;
        this.km = km;
    }

    static createFromList = (records) => records
                                            .map((change) => new Change(change.changed_at, 
                                                                        change.km_realised));
}

module.exports = Change;
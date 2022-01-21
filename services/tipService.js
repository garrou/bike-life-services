const http = require('../constants/http.json');
const Tip = require('../models/Tip');
const tipRepository = require('../repositories/tipRepository');

module.exports.getAll = async (_, res) => {
    const resp = await tipRepository.getAll();
    const tips = Tip.createFromList(resp.rows);
    return res.status(http.OK).json(tips);
}
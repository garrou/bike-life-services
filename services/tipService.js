const http = require('../constants/http.json');
const { createFromList } = require('../models/Tip');
const Tip = require('../models/Tip');
const tipRepository = require('../repositories/tipRepository');

module.exports.getAll = async (_, res) => {

    const resp = await tipRepository.getAll();
    const tips = Tip.createFromList(resp.rows);
    return res.status(http.OK).json(tips);
}

module.exports.getTip = async (req, res) => {

    const { tipId } = req.params;
    const resp = await tipRepository.get(tipId);
    const tip = createFromList(resp.rows)[0];
    return res.status(http.OK).json(tip);
}

module.exports.getByTopic = async (req, res) => {

    const { topic } = req.params;
    const resp = await tipRepository.getByTopic(topic);
    const tips = createFromList(resp.rows);
    return res.status(http.OK).json(tips);
}
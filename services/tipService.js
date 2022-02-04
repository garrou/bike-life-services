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
    const tip = new Tip(resp.rows[0].tip_id, 
                        resp.rows[0].component_type, 
                        resp.rows[0].title,
                        resp.rows[0].content,
                        resp.rows[0].vote_up,
                        resp.rows[0].vote_down,
                        resp.rows[0].write_date);
    return res.status(http.OK).json(tip);
}

module.exports.getByType = async (req, res) => {

    const { componentType } = req.params;
    const resp = await tipRepository.getByType(componentType);
    const tips = createFromList(resp.rows);
    return res.status(http.OK).json(tips);
}
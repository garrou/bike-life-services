const componentRepository = require('../repositories/componentRepository');
const http = require('../constants/http.json');
const { createFromList } = require('../models/Component');

module.exports.getBikeComponents = async (req, res) => {
    
    const { bikeId } = req.params;
    const resp = await componentRepository.getBikeComponents(bikeId);
    const components = createFromList(resp.rows);
    return res.status(http.OK).json(components);
}

module.exports.getAlerts = async (req, res) => {

    const { memberId } = req.params;
    const resp = await componentRepository.getAlerts(memberId, 0.8);
    const components = createFromList(resp.rows);
    return res.status(http.OK).json(components);
}
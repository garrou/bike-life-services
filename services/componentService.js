const componentRepository = require('../repositories/componentRepository');
const validator = require('../utils/validator');
const http = require('../constants/http.json')

module.exports.getBikeComponents = async (req, res) => {
    const { bikeId } = req.query;
    const resp = await componentRepository.getBikeComponents(bikeId);
    return res.status(http.OK).json(resp.rows);
}

module.exports.updateComponent = async (req, res) => {
    const component = JSON.parse(req.body.component);

    if (!validator.isValidKm(component.km) && !validator.isValidKm(component.duration)) {
        return res.status(constants.FORBIDDEN).json({'confirm': 'Informations invalides'});
    }
    await componentRepository.updateComponent(component);
    return res.status(http.OK).json({'confirm': 'Composant modifié'});
}
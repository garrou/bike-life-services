const componentTypesRepository = require('../repositories/componentTypesRepository');
const http = require('../constants/http.json');

module.exports.getTypesNames = async (_, res) => {
    const resp = await componentTypesRepository.getTypesNames();
    return res.status(http.OK).json(resp.rows);
}
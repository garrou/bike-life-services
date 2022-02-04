const componentTypesRepository = require('../repositories/componentTypesRepository');
const http = require('../constants/http.json');

module.exports.getNames = async (_, res) => {
    
    const resp = await componentTypesRepository.getNames();
    return res.status(http.OK).json(resp.rows);
}
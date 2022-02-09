const componentTypesRepository = require('../repositories/componentTypesRepository');
const http = require('../constants/http.json');

module.exports.get = async (_, res) => {
    
    const resp = await componentTypesRepository.get();
    return res.status(http.OK).json(resp.rows);
}
const componentTypesRepository = require('../repositories/componentTypesRepository');
const http = require('../constants/http.json');

module.exports.getTypes = async (_, res) => {
    const resp = await componentTypesRepository.getTypes();
    return res.status(http.OK).json(resp.rows);
}
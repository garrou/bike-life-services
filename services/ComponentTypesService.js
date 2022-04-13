const ComponentTypesRepository = require('../repositories/ComponentTypesRepository');
const http = require('../constants/http.json');

class ComponentTypesService {

    static get = async (_, res) => {
    
        try {
            const resp = await ComponentTypesRepository.getAll();
            return res.status(http.OK).json(resp['rows']);
        } catch (err) {
            return res.status(http.BAD_REQUEST).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
}

module.exports = ComponentTypesService;
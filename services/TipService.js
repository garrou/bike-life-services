const Tip = require('../models/Tip'); 
const TipRepository = require('../repositories/TipRepository');
const http = require('../constants/http.json');

class TipService {

    static getAll = async (_, res) => {

        try {
            const resp = await TipRepository.getAll();
            const tips = Tip.fromList(resp['rows']);

            return res.status(http.OK).json(tips);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur.'});
        }
    }
    
    static getTip = async (req, res) => {
    
        try {
            const resp = await TipRepository.getById(req.params['tipId']);
            const tips = Tip.fromList(resp['rows'])[0];

            return res.status(http.OK).json(tips);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur.'});
        }
    }
    
    static getByTopic = async (req, res) => {
    
        try {
            const resp = await TipRepository.getByTopic(req.params['topic']);
            const tips = Tip.fromList(resp['rows']);

            return res.status(http.OK).json(tips);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur.'});
        }
    }

    static getTopics = async (req, res) => {

        try {
            const resp = await TipRepository.getTopics();

            return res.status(http.OK).json(resp['rows']);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur.'});
        }
    }
}

module.exports = TipService;
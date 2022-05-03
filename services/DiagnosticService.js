const Diagnostic = require("../models/Diagnostic");
const DiagnosticRepository = require("../repositories/DiagnosticRepository");
const Tip = require("../models/Tip");
const TipRepository = require("../repositories/TipRepository");
const http = require('../constants/http.json');

class DiagnosticService {

    static getDiagnostics = async (req, res) => {
    
        try {
            const { type } = req.params;
            const resp = await DiagnosticRepository.getByBikeType(type);
            const diagnostics = Diagnostic.fromList(resp['rows']);
            return res.status(http.OK).json(diagnostics);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }

    static checkDiagnostics = async (req, res) => {

        try {
            const { data } = req.body;
            const arr = Object.entries(data)
                            .filter(entry => entry[1] === false || entry[1] === 'false')
                            .map(arr => arr[0]);
            let tips = [];

            if (arr.length > 0) {
                const resp = await TipRepository.getBySeveralId(arr.toString())
                tips = Tip.fromList(resp['rows']);
            }
            return res.status(http.OK).json({'confirm': 'OK', 'tips': tips});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant le communication avec le serveur'});
        }
    }
}

module.exports = DiagnosticService;
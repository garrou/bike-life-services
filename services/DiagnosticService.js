const Diagnostic = require("../models/Diagnostic");
const DiagnosticRepository = require("../repositories/DiagnosticRepository");
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
}

module.exports = DiagnosticService;
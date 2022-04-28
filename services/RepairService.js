const http = require("../constants/http.json");
const Repair = require("../models/Repair");

class RepairService {

    static addRepair = async (req, res) => {

        try {
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }

    static getRepairs = async (req, res) => {

        try {

        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
}

module.exports = RepairService;
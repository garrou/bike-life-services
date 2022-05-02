const http = require("../constants/http.json");
const Repair = require("../models/Repair");
const RepairRepository = require('../repositories/RepairRepository');

class RepairService {

    static addRepair = async (req, res) => {

        try {
            const repair = Repair.fromJson(req.body);

            if (!repair.isValid()) {
                return res.status(http.BAD_REQUEST).json({'confirm': 'Informations invalides'});
            }
            await RepairRepository.create(repair);
            return res.status(http.CREATED).json({'confirm': 'Réparation ajoutée', 'repair': repair});
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }

    static getRepairs = async (req, res) => {

        try {
            const { componentId } = req.params;
            const resp = await RepairRepository.getByComponent(componentId);
            const repairs = Repair.fromList(resp['rows']);
            return res.status(http.OK).json(repairs);
        } catch (err) {
            return res.status(http.INTERNAL_SERVER_ERROR).json({'confirm': 'Erreur durant la communication avec le serveur'});
        }
    }
}

module.exports = RepairService;
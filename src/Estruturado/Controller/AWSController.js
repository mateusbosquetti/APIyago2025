const AWSService = require('../Service/AWSService');

class AWSController {
    async buscarImagem(req, res) {
        try {
            const { referencia } = req.body;
            if (!referencia) {
                return res.status(400).json({ error: "A referência da imagem é obrigatória." });
            }
            const resultado = await AWSService.buscarImagem(referencia);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async uploadImagem(req, res) {
        try {
            const { file } = req; // Supondo que o arquivo seja enviado como multipart/form-data
            if (!file) {
                return res.status(400).json({ error: "Nenhum arquivo enviado." });
            }

            const resultado = await AWSService.uploadImagem(file);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AWSController();
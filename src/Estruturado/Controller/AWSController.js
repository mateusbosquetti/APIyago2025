const AWSService = require('../Service/AWSService');
const path = require('path');
const fs = require('fs');

/**
 * @author Mateus Henrique Bosquetti
 * @version 1.0
 * @since 18/02/2025
 */
class AWSController {

    /**
     * Método que busca imagem e retorna o seu URL
     * @param { referencia } req 
     * @returns URL da imagem da aws 
     */
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

    /**
     * Método que posta uma imagem na aws
     * @param { file } req 
     * @returns URL da imagem postada na aws
     */
    async uploadImagem(req, res) {
        try {
            const { file } = req;
            if (!file) {
                return res.status(400).json({ error: "Nenhum arquivo enviado." });
            }

            const resultado = await AWSService.uploadImagem(file);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Método que faz download de uma imagem da aws para a sua maquina (obs: pasta downloads)
     * @param { referencia } req
     * @returns Imagem baixada
     */
    async downloadImagem(req, res) {
        try {
            const { referencia } = req.body;
            if (!referencia) {
                return res.status(400).json({ error: "A referência da imagem é obrigatória." });
            }

            const filePath = await AWSService.downloadImagem(referencia);

            res.download(filePath, (err) => {
                if (err) {
                    console.error("Erro ao enviar o arquivo:", err);
                    res.status(500).json({ error: "Erro ao enviar o arquivo." });
                }

                console.log(`Arquivo salvo em: ${filePath}`);
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AWSController();
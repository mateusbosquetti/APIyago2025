const AWSService = require('../Service/AWSService');

/**
 * @author Mateus Henrique Bosquetti
 * @version 1.0
 * @since 18/02/2025
 */
class AWSController {

    /**
     * Método que busca uma imagem na AWS e retorna a URL assinada.
     * @param { referencia } referencia 
     * @returns A URL da imagem.
     */
    async buscarImagem(req, res) {
        try {
            const { referencia } = req.params;
            const response = await AWSService.buscarImagem(referencia);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Método que faz o upload de uma imagem para a AWS e salva os dados no banco de dados.
     * @param { file } file 
     * @param { id } id 
     * @returns A URL da imagem após o upload.
     */
    async uploadImagem(req, res) {
        try {
            const { file } = req;
            const { id } = req.params;
            const response = await AWSService.uploadImagem(file, id);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Método que faz o download de uma imagem da AWS e salva na pasta Downloads.
     * @param { referencia } referencia 
     * @returns O caminho onde a imagem foi salva.
     */
    async downloadImagem(req, res) {
        try {
            const { referencia } = req.params;
            const filePath = await AWSService.downloadImagem(referencia);
            res.status(200).json({ message: 'Imagem baixada com sucesso!', path: filePath });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AWSController();
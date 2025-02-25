const AWSRepository = require('../Repository/AWSRepository');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

/**
 * @author Mateus Henrique Bosquetti
 * @version 1.0
 * @since 18/02/2025
 */
class AWSService {

    /**
     * Método que busca uma imagem na AWS e retorna a URL assinada.
     * @param { referencia } referencia 
     * @returns A URL da imagem.
     */
    async buscarImagem(referencia) {
        return await AWSRepository.buscarImagem(referencia);
    }

    /**
     * Método que faz o upload de uma imagem para a AWS e salva os dados no banco de dados.
     * @param { file } file 
     * @param { id } id 
     * @returns A URL da imagem após o upload.
     */
    async uploadImagem(file, id) {
        const referencia = crypto.randomUUID();
        const url = await AWSRepository.uploadImagem(file, id, referencia);
        return url;
    }

    /**
     * Método que faz o download de uma imagem da AWS e salva na pasta Downloads.
     * @param { referencia } referencia 
     * @returns O caminho onde a imagem foi salva.
     */
    async downloadImagem(referencia) {
        const fileData = await AWSRepository.downloadImagem(referencia);

        const downloadsPath = path.join(require('os').homedir(), 'Downloads');
        const filePath = path.join(downloadsPath, referencia);

        fs.writeFileSync(filePath, fileData);

        return filePath;
    }
}

module.exports = new AWSService();
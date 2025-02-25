const AWSRepository = require('../Repository/AWSRepository');
const path = require('path');
const fs = require('fs');

/**
 * @author Mateus Henrique Bosquetti
 * @version 1.0
 * @since 18/02/2025
 */
class AWSService {

    /**
     * Esse método chama o método da AWSRepository de buscarImagem
     * @param { referencia } referencia 
     * @returns resposta do método buscarImagem da AWSRepository
     */
    async buscarImagem(referencia) {
        return await AWSRepository.buscarImagem(referencia);
    }

    /**
     * Esse método chama o método da AWSRepository de uploadImagem
     * @param { file } file 
     * @returns resposta do método uploadImagem da AWSRepository
     */
    async uploadImagem(file) {
        return await AWSRepository.uploadImagem(file);
    }

    /**
     * Esse método pega o arquivo e o caminho do arquivo ("/Downloads") e baixa a imagem la
     * @param { referencia } referencia 
     * @returns O caminho da imagem que foi baixada
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
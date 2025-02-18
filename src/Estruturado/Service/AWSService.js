const AWSRepository = require('../Repository/AWSRepository');

class ImagemService {
    async buscarImagem(referencia) {
        return await AWSRepository.buscarImagem(referencia);
    }
}

module.exports = new ImagemService();
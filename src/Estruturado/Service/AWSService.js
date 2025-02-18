const AWSRepository = require('../Repository/AWSRepository');

class AWSService {
    async buscarImagem(referencia) {
        return await AWSRepository.buscarImagem(referencia);
    }

    async uploadImagem(file) {
        return await AWSRepository.uploadImagem(file);
    }
}

module.exports = new AWSService();
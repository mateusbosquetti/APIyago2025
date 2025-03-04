const ImagemRepository = require('../Repository/ImagemRepository');
const Imagem = require('../Entity/Imagem');

class ImagemService {
    async criarNovaImagem(referencia) {
        const novaImagem = new Imagem(referencia);
        return await ImagemRepository.criarImagem(novaImagem);
    }

    async listarImagem() {
        return await ImagemRepository.listarImagem();
    }

    async buscarImagem(id) {
        return await ImagemRepository.buscarImagem(id);
    }

    async atualizarImagem(id, referencia) {
        const dadosAtualizados = { referencia };
        return await ImagemRepository.atualizarImagem(id, dadosAtualizados);
    }

}

module.exports = new ImagemService();

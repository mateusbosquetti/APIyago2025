class Imagem {
    constructor(referencia) {
        this.referencia = referencia;
        
        const date = new Date();
        this.data_criacao = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;;
    }
}

module.exports = Imagem;
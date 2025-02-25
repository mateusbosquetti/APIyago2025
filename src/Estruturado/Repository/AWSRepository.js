const AWS = require('aws-sdk');
const database = require('../database/connection');
const Imagem = require('../Entity/Imagem');
const usuarioRepository = require('../Repository/UsuarioRepository');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIA5RRHCKYZ6W4OB6NB',
    secretAccessKey: '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'
});

const s3 = new AWS.S3();

/**
 * @author Mateus Henrique Bosquetti
 * @version 1.0
 * @since 18/02/2025
 */
class AWSRepository {

    /**
     * Método que busca uma imagem na AWS e retorna a URL assinada.
     * @param { referencia } referencia 
     * @returns A URL da imagem.
     */
    async buscarImagem(referencia) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia
            };

            const url = s3.getSignedUrl('getObject', params);
            return { url };
        } catch (error) {
            throw new Error("Erro ao buscar imagem no S3: " + error.message);
        }
    }

    /**
     * Método que faz o upload de uma imagem para a AWS e salva os dados no banco de dados.
     * @param { file } file 
     * @param { id } id 
     * @param { referencia } referencia 
     * @returns A URL da imagem após o upload.
     */
    async uploadImagem(file, id, referencia) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia,
                Body: file.buffer,
                ContentType: file.mimetype
            };

            console.log(id)

            const userTest = await usuarioRepository.buscarUsuario({id});

            const resultado = await s3.upload(params).promise();

            const imagem = new Imagem(file.originalname, id);

            await database('imagem').insert({
                referencia: referencia,
                usuario_id: imagem.usuario_id,
                data_criacao: imagem.data_criacao
            });

            const response = await this.buscarImagem(referencia);
            return { url: response };
        } catch (error) {
            throw new Error("Erro ao fazer upload da imagem no S3: " + error.message);
        }
    }

    /**
     * Método que faz o download de uma imagem da AWS.
     * @param { referencia } referencia 
     * @returns O conteúdo da imagem.
     */
    async downloadImagem(referencia) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: referencia
            };

            const data = await s3.getObject(params).promise();
            return data.Body;
        } catch (error) {
            throw new Error("Erro ao baixar imagem do S3: " + error.message);
        }
    }
}

module.exports = new AWSRepository();
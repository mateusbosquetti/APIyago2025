const AWS = require('aws-sdk');
const database = require('../database/connection')
const Imagem = require('../Entity/Imagem');


/*
https://931016103475.signin.aws.amazon.com/console
usermi74
Senha@mi74
*/


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
     * Método que busca uma imagem na AWS, primeiro os parametros sao definidos, depois é feito uma requisicao para a AWS
     * @param { referencia } referencia 
     * @returns a URL retornada pela requisicao feita a AWS
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
    * Método que posta uma imagem na AWS, primeiro os parametros sao definidos, depois é feito uma requisicao para a AWS com eles
     * @param { file } file 
     * @returns O retorno é a URL que o método buscarImagem retorna apos receber como atributo a imagem postada
     */
    async uploadImagem(file, id) {
        try {
            const params = {
                Bucket: 'bucketmi74',
                Key: file.originalname,
                Body: file.buffer,
                ContentType: file.mimetype
            };

            const resultado = await s3.upload(params).promise();

            const imagem = new Imagem(file.originalname, id.id);

            console.log(imagem)

            await database('imagem').insert({
                referencia: imagem.referencia,
                usuario_id: imagem.usuario_id,
                data_criacao: imagem.data_criacao
            });

            const response = await this.buscarImagem(file.originalname);
            return { url: response };
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            throw new Error("Erro ao fazer upload da imagem no S3: " + error.message);
        }
    }

    /**
    * Método que busca uma imagem na AWS, e baixa ela na sua pasta Donwloads
     * @param { referencia } referencia 
     * @returns O retorno é o arquivo
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
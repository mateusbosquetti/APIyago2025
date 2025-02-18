const AWS = require('aws-sdk');

            //AQUI


const s3 = new AWS.S3();

class AWSRepository {
    async buscarImagem(referencia) {
        try {
            //AQUI

            const url = s3.getSignedUrl('getObject', params);
            return { url };
        } catch (error) {
            throw new Error("Erro ao buscar imagem no S3: " + error.message);
        }
    }
}

/*
    AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIA5RRHCKYZU46MAWLR',
    secretAccessKey: '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'
});

const params = {
                Bucket: 'bucketmi74',
                Key: referencia
            };

*/


module.exports = new AWSRepository();
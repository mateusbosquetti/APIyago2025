const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: ''
});

const s3 = new AWS.S3();

class AWSRepository {
    async buscarImagem(referencia) {
        try {
            const params = {
                Key: referencia
            };

            const url = s3.getSignedUrl('getObject', params);
            return { url };
        } catch (error) {
            throw new Error("Erro ao buscar imagem no S3: " + error.message);
        }
    }
}

/*
                Bucket: 'bucketmi74',

accessKeyId: 'AKIA5RRHCKYZU46MAWLR',
    secretAccessKey: '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'
*/

module.exports = new AWSRepository();
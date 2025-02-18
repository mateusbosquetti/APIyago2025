const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const AWSController = require('../Estruturado/Controller/AWSController')

router.get('/aws/get', AWSController.buscarImagem)

module.exports = router
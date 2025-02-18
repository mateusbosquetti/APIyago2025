const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const AWSController = require('../Estruturado/Controller/AWSController')
const ImageControllerNova = require('../Estruturado/Controller/ImageController')
const UserControllerNova = require('../Estruturado/Controller/UsuarioController')

router.post('/estruturado/novaImagem', ImageControllerNova.novaImagem)
router.get('/estruturado/imagens', ImageControllerNova.listarImagem)
router.get('/estruturado/imagem/:id', ImageControllerNova.buscarImagem)
router.put('/estruturado/editarImagem/:id', ImageControllerNova.atualizarImagem)
router.delete('/estruturado/apagarImagem/:id', ImageControllerNova.removerImagem);

router.post('/estruturado/novoUsuario', UserControllerNova.novaUsuario)
router.get('/estruturado/usuarios', UserControllerNova.listarUsuario)
router.get('/estruturado/usuario/:id', UserControllerNova.buscarUsuario)
router.put('/estruturado/editarUsuario/:id', UserControllerNova.atualizarUsuario)
router.delete('/estruturado/apagarUsuario/:id', UserControllerNova.removerUsuario);

router.get('/usuarios', AWSController.buscarImagem)

module.exports = router
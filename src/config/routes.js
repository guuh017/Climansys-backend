const express = require('express')
const auth = require('./auth')

module.exports = (server) => {

	//API ABERTA
	const apiAberta = express.Router()
	server.use('/oapi', apiAberta)

	const AuthService = require('../api/templates/services/AuthService')
	apiAberta.post('/login', AuthService.login)
	apiAberta.post('/signup', AuthService.signup)
	apiAberta.post('/validarToken', AuthService.validarToken)

	//API PROTEGIDA
	const apiProtegida = express.Router()
	server.use('/api', apiProtegida)

	apiProtegida.use(auth)

	const paciente = require('../api/templates/services/pacienteService')
	const medico = require('../api/templates/services/medicoService')
	const atendente = require('../api/templates/services/atendenteService')
	const consulta = require('../api/templates/services/consultaService')

	paciente.register(apiProtegida, '/pacientes')
	medico.register(apiProtegida, '/medicos')
	atendente.register(apiProtegida, '/atendentes')
	consulta.register(apiProtegida, '/consultas')
}
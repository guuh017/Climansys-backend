const express = require('express')

module.exports = function(server){

	
	const router = express.Router()
	server.use('/api', router)

	const models = require('../api/templates/modelsService')
	// models.paciente.register(router, '/pacientes')
	models.medico.register(router, '/medicos')
	models.atendente.register(router, '/atendentes')
	models.consulta.register(router, '/consultas')

	const paciente = require('../api/templates/pacienteService')
	paciente.register(router, '/pacientes')
}
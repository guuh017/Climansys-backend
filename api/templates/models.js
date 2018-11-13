const restful = require('node-restful')
const mongoose = restful.mongoose

const telefoneSchema = new mongoose.Schema({
	nome: { type: String, required: true,
		enum: ['RESIDENCIAL', 'COMERCIAL', 'CELULAR'], default: 'RESIDENCIAL' },
	telefone: { type: String, required: true }
}, { _id: false })

const pacienteSchema = new mongoose.Schema({
	nome: { type: String, required: true },
	sobrenome: { type: String, required: true },
	cpf: { type: String, required: true, unique: true },
	rg: { type: String, required: true, unique: true },
	adimplente: { type: Boolean, required: true, default: true },
	nascimento: { type: Date, required: true, default: new Date("1970-01-01")},
	telefone: [telefoneSchema],
	endereco: {
		rua: { type: String, required: true },
		numero: { type: Number, required: false },
		complemento: { type: String, required: false },
		cep: { type: String, required: true },
		cidade: {type: String, required: true },
		bairro: { type: String, required: true },
		uf: { type: String, required: true, maxlength: 2 }
	}
})

const medicoSchema = new mongoose.Schema({
	nome: { type: String, required: true },
	sexo: { type: String, required: true, enum:['M', 'F'] },
	crm: { type: String, required: true, unique: true },
	telefone: [telefoneSchema]
})

const atendenteSchema = new mongoose.Schema({
	nome: { type: String, required: true },
	sexo: { type: String, required: true, enum:['M', 'F'] },
	telefone: [telefoneSchema]
})

const consultaSchema = new mongoose.Schema({
	data: { type: Date, default: Date.now, required: true },
	status: { type: String, required: true, enum: ['PENDENTE', 'CONFIRMADO', 'CANCELADO'], default: 'PENDENTE'},
	observacao: { type: String, required: false },
	medico: {
		crm: { type: String, required: true },
		nome: { type: String, required: true }
	},
	paciente: {
		cpf: { type: String, required: true },
		nome: { type: String, required: true },
		sobrenome: { type: String, required: true }
	},
	pagamento: {
		tipo_pagamento: { type: String, required: true, enum: ['DINHEIRO', 'DEBITO', 'CREDITO', 'N/A'], default: 'N/A' },
		data: { type: Date, default: Date.Now }
	}
})

module.exports = {
	paciente: restful.model('pacientes', pacienteSchema),
	medico: restful.model('medicos', medicoSchema),
	atendente: restful.model('atendentes', atendenteSchema),
	consulta: restful.model('consultas', consultaSchema)
}
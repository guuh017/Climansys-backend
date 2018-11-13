const models = require('./models')

//models.paciente.methods(['get', 'post', 'put', 'patch', 'delete'])
models.medico.methods(['get', 'post', 'put', 'patch', 'delete'])
models.atendente.methods(['get', 'post', 'put', 'patch', 'delete'])
models.consulta.methods(['get', 'post', 'put', 'patch', 'delete'])

//models.paciente.updateOptions({ new: true, runValidators: true })
models.medico.updateOptions({ new: true, runValidators: true })
models.atendente.updateOptions({ new: true, runValidators: true })
models.consulta.updateOptions({ new: true, runValidators: true })

// models.paciente.route('count', (req, res, next) => {
// 	models.paciente.count((error, value) => {
// 		if(error){
// 			res.status(500).json({ errors: [error] })
// 		} else {
// 			res.json({ value })
// 		}
// 	})
// })

models.medico.route('count', (req, res, next) => {
	models.medico.count((error, value) => {
		if(error){
			res.status(500).json({ errors: [error] })
		} else {
			res.json({ value })
		}
	})
})

models.atendente.route('count', (req, res, next) => {
	models.atendente.count((error, value) => {
		if(error){
			res.status(500).json({ errors: [error] })
		} else {
			res.json({ value })
		}
	})
})

models.consulta.route('count', (req, res, next) => {
	models.consulta.count((error, value) => {
		if(error){
			res.status(500).json({ errors: [error] })
		} else {
			res.json({ value })
		}
	})
})

module.exports = models
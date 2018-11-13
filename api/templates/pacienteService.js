const paciente = require('./models').paciente
const catchError = require('./errors')

paciente.methods(['get', 'post', 'put', 'patch', 'delete'])
paciente.updateOptions({ new: true, runValidators: true })

paciente.after('post', catchError).after('put', catchError)

paciente.route('count', (req, res, next) => {
	paciente.count((error, value) => {
		if(error){
			res.status(500).json({ errors: [error] })
		} else {
			res.json({ value })
		}
	})
})

module.exports = paciente
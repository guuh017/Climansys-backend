const paciente = require('../models/models').paciente
const displayErrorOrNext = require('../models/errors')

paciente.methods(['get', 'post', 'put', 'patch', 'delete'])
paciente.updateOptions({ new: true, runValidators: true })

paciente.after('post', displayErrorOrNext).after('put', displayErrorOrNext)

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
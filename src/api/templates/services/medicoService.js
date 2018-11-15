const medico = require('../models/models').medico
const displayErrorOrNext = require('../models/errors')

medico.methods(['get', 'post', 'put', 'patch', 'delete'])
medico.updateOptions({ new: true, runValidators: true })

medico.after('post', displayErrorOrNext).after('put', displayErrorOrNext)

medico.route('count', (req, res, next) => {
	medico.count((error, value) => {
		if(error){
			res.status(500).json({ errors: [error] })
		} else {
			res.json({ value })
		}
	})
})

module.exports = medico
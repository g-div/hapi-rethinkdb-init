import RethinkDBInit from 'rethinkdb-init';
import Joi from 'joi';

// Declare internals
let internals = {};

exports.register = (server, options, next) => {
    // Validate options
    options.tables = options.tables || [];
    const schema = Joi.object().keys({
        tables: Joi.array()
    });

	schema.validate(options, (err, value) => {
		if (err) throw err;

		// Define hapi-rethinkdb dependency
		server.dependency(['hapi-rethinkdb'], internals.register(server, options, () => {
			return next();
		}));
	});

};

internals.register = (server, options, next) => {

	const {
		rethinkdb: r,
		connection: conn
	} = server.plugins['hapi-rethinkdb'];

	RethinkDBInit(r);

	r.init({
		host: conn.host,
		port: conn.port,
		db: conn.db
	}, options.tables).then(conn => {
		return next();
	});
};

exports.register.attributes = {
	pkg: require('../package.json')
};
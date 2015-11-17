import r from 'rethinkdb';
import Hapi from 'hapi';
import HapiRethinkDB from 'hapi-rethinkdb';
import HapiRethinkDBInit from '../';

import Code from 'code';
import Lab from 'lab';
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;


describe('hapi-rethinkdb-init', () => {

	const server = new Hapi.Server();
	const dbOptions = {
		db: 'testdb'
	};
	const initOptions = {
		tables: [{
				name: 'person',
				indexes: ['firstName', 'lastName']
			},
			'address'
		]
	};
	let connection = null;

	before({ timeout: 5000 }, done => {
        r.connect({host: 'localhost', port: 28015}).then(conn => {
            connection = conn;

			server.register({register: HapiRethinkDB, options: dbOptions}, (err) => {
				if (err) throw err;
				server.register({register: HapiRethinkDBInit, options: initOptions}, (err) => {
					expect(err).to.not.exist();

					server.connection();
					server.start(done);
				});
			});        	
        }).error(err => {
        	throw err;        	
        });
	});

	it('creates the database registered by hapi-rethinkdb', (done) => {

		r.dbList().run(connection).then(res => {
            expect(res).to.include(dbOptions.db);

        	done();
        }).error(err => {
        	throw err;
        });

    });

	it('creates the tables passed as options', (done) => {

		r.db(dbOptions.db).tableList().run(connection).then(res => {
            expect(res).to.include(initOptions.tables[0].name);
            expect(res).to.include(initOptions.tables[1]);

        	done();
        }).error(err => {
        	throw err;
        });

    });

	it('creates the indexes passed as options', (done) => {

		r.db(dbOptions.db).table(initOptions.tables[0].name).indexList().run(connection).then(res => {
            expect(res).to.include(initOptions.tables[0].indexes);

        	done();
        }).error(err => {
        	throw err;
        });

    });

	after(done => {
		// delete fixtures
        r.dbDrop(dbOptions.db).run(connection).then(res => {
        	done();
        }).error(err => {
        	throw err;
        });
	});
});


describe('without plugin options', () => {

	const server = new Hapi.Server();
	const dbOptions = {
		db: 'testdb'
	};
	let connection = null;

	before({ timeout: 5000 }, done => {
        r.connect({host: 'localhost', port: 28015}).then(conn => {
            connection = conn;

			server.register({register: HapiRethinkDB, options: dbOptions}, (err) => {
				if (err) throw err;
				server.register(HapiRethinkDBInit, (err) => {
					expect(err).to.not.exist();

					server.connection();
					server.start(done);
				});
			});        	
        }).error(err => {
        	throw err;        	
        });
	});

	it('creates the database registered by hapi-rethinkdb', (done) => {

		r.dbList().run(connection).then(res => {
            expect(res).to.include(dbOptions.db);

        	done();
        }).error(err => {
        	throw err;
        });

    });

	after(done => {
		// delete fixtures
        r.dbDrop(dbOptions.db).run(connection).then(res => {
        	done();
        }).error(err => {
        	throw err;
        });
	});
});

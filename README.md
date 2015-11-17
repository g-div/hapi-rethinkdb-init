# hapi-rethinkdb-init

![npm](https://img.shields.io/npm/v/hapi-rethinkdb-init.svg) ![travis-status](https://img.shields.io/travis/g-div/hapi-rethinkdb-init.svg)

A micro plugin that use rethinkdb-init to create databases, tables and indexes when your hapi server starts.

![nodei.co](https://nodei.co/npm/hapi-rethinkdb-init.png?downloads=true&downloadRank=true&stars=true)

![](https://david-dm.org/g-div/hapi-rethinkdb-init/status.svg)
![](https://david-dm.org/g-div/hapi-rethinkdb-init/dev-status.svg)

## Install

`npm install --save hapi-rethinkdb-init`

## Use

```javascript
var Hapi = require('hapi');

var server = new Hapi.Server();

var options = {
	tables: [
    {
      name: 'person',
      indexes: ['firstName', 'lastName']
    },
    'address'
  ]
};

server.register(require('hapi-rethinkdb'), function (err) {
	server.register({register: require('hapi-rethinkdb-init'), options: options}, function (err) {
		// Table person with firstName and lastName indexes created
		// Table address created
	});
});
```

### Options

- `tables` - the array of tables expected by `rethinkdb-init`. Please refer to the [rethinkdb-init documentation](https://github.com/thejsj/rethinkdb-init/blob/master/README.md).

## Dependencies

Package | Version | Dev
--- |:---:|:---:
[joi](https://www.npmjs.com/package/joi) | ^7.0.0 | ✖
[node-readme](https://www.npmjs.com/package/node-readme) | ^0.1.9 | ✖
[rethinkdb](https://www.npmjs.com/package/rethinkdb) | ^2.2.0 | ✖
[rethinkdb-init](https://www.npmjs.com/package/rethinkdb-init) | 0.0.5 | ✖
[babel-cli](https://www.npmjs.com/package/babel-cli) | ^6.1.18 | ✔
[code](https://www.npmjs.com/package/code) | ^2.0.1 | ✔
[hapi](https://www.npmjs.com/package/hapi) | ^11.1.1 | ✔
[lab](https://www.npmjs.com/package/lab) | ^7.3.0 | ✔
[rethinkdb](https://www.npmjs.com/package/rethinkdb) | ^2.2.0 | ✔


## Author

g-div

## License

 - **MIT** : http://opensource.org/licenses/MIT

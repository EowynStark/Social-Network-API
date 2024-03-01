const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost/socialNetwork';

connect(connectionString);

module.exports = connection;
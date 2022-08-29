console.log("... running index.js file ...")

const Sequelize = require('sequelize');

const sequelize = new Sequelize('', '', '', {
   // dialect parameter specifies version of SQL, the SQL dialect
   dialect: 'sqlite',
   // the storage key specifies the file path or the storage engine for SQLite
   storage: '../movies.db',
   // logging: false    <-- this will disable logging
   logging: false,
});

// db will be an object containing the sequelize instances and the Movie model
const db = {
   sequelize,
   Sequelize,
   models: {},
};

db.models.Movie = require('./models/movie.js')(sequelize);

module.exports = db;

console.log("... db/index.js file ran successfully ...");
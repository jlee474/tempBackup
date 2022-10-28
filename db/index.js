console.log("... running index.js file ...")

const Sequelize = require('sequelize'); // the require('sequelize') is the library
// require('sequelize') summons the library. Sequelize is the same but in variable format. sequelize is a new instance.
const sequelize = new Sequelize('', '', '', {
   // dialect parameter specifies version of SQL, the SQL dialect
   dialect: 'sqlite',
   // the storage key specifies the file path or the storage engine for SQLite
   storage: './movies.db',
   // logging: false    <-- this will disable logging
   logging: false,
   define: {
      // set global options here
   },
});

// db will be an object containing the sequelize instances and the Movie model
const db = {
   sequelize,
   Sequelize,
   models: {},
};

db.models.Movie = require('./models/movie.js')(sequelize);
db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;

console.log("... db/index.js file ran successfully ...");
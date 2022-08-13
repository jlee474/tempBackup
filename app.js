console.log("Hello world!")

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
   // dialect parameter specifies version of SQL, the SQL dialect
   dialect: 'sqlite',
   // the storage key specifies the file path or the storage engine for SQLite
   storage: 'movies.db',
   // logging: false    <-- this will disable logging
});

// async IIFE Immediately Invoked Function Expression
(async () => {
   try {
      // sequelize.authenticate function returns a Promise object
      await sequelize.authenticate();
      console.log("Database authentication successful")
   } catch (error) {
      console.error("oops, looks like there was an error in the try catch block: ", error);
   }
})();

console.log("async test marker 1")

class Movie extends Sequelize.Model {
   
   // constructor() {
      // gives an error when I create a constructor here. okay....
   // }
   
};

Movie.init({
   title: Sequelize.STRING
}, { sequelize });  // same as {sequelize: sequelize}

(async () => {

   await sequelize.sync( {force: true} );  // shouldn't this line go inside the catch block?
   console.log("Database synchronization successful");

   try {

      // the example below uses async await instead of Promises
      /*
      const movie = await Movie.create({
         title: 'Kick-ass 2',
      });
      console.log(movie.toJSON());

      const movie2 = await Movie.create({
         title: 'Inception',
      });
      console.log(movie2.toJSON());

      await Movie.create({
         title: 'The Last Samurai',
      });
      */


      // the example below uses Promises. The movieInstances variable is an array of Classes.
      // each class is a [[Prototype]]: Model

      const movieInstances = await Promise.all([
         Movie.create({
            title: 'Toy Story'
         }),
         Movie.create({
            title: 'The Incredibles'
         }),
         ]);
         const moviesJSON = movieInstances.map(movie => movie.toJSON());
         console.log(moviesJSON);

   } catch (error) {
      console.error("Error connecting to the database: ", error);
   }

})();


console.log("async test marker 2")


console.log("Hello world! This is the app.js module");

const db = require('./db'); // or require('./db/index.js')
const {Movie} = db.models;

// async IIFE Immediately Invoked Function Expression
(async () => {
   try {
      // sequelize.authenticate function returns a Promise object
      await db.sequelize.authenticate();
      console.log("Database authentication successful")
   } catch (error) {
      console.error("oops, looks like there was an error in the try catch block: ", error);
   }
})();

console.log("async test marker 1")

console.log(Movie);

(async () => {

   await db.sequelize.sync( {force: true} );  // shouldn't this line go inside the catch block?
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


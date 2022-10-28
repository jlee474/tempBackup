console.log("Hello world! This is the app.js module");

const db = require('./db'); // or require('./db/index.js')
const {Movie} = db.models; // short hand form for writing Movie = db.models.Movie
const Person = db.models.Person;

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
            title: 'Toy Story',
            runtime: 81,
            releaseDate: "1995-11-22",
            isAvailableonVHS: true
         }),
         Movie.create({
            title: 'The Incredibles',
            runtime: 115,
            releaseDate: "2004-04-14",
            isAvailableonVHS: true
         }),
         Movie.create({
            title: 'Candy Man',
            runtime: 90,
            releaseDate: "2001-05-03",
            isAvailableonVHS: false
         }),
      ]);
      const moviesJSON = movieInstances.map(movie => movie.toJSON());
      console.log(moviesJSON);

      const personInstances = async function () {
         let arrayPersons = [
            await Person.create({
               firstName: "Joe",
               lastName: "Schmoe"
            }),
            await Person.create({
               firstName: "Jason",
               lastName: "Lee"
            }),
            await Person.create({
               firstName: "Tom",
               lastName: "Cruise"
            })
         ];
         
         return arrayPersons;
      }
      
      const persons = await personInstances(); // without the await prefix, the promise state is "pending"
      const personJSON = persons.map(person => person.toJSON() );
      
      console.log(personJSON);

   } catch (error) {
      if (error.name === "SequelizeValidationError") {
         const theErrors = error.errors.map(i => i.message)
            console.log("A SequelizeValidationError has occured: ", theErrors);
      } else {
         console.error("An error (other than SequelizeValidationError) has occurred: ", error);
         throw error;
      }
   }

})();

console.log("async test marker 2")


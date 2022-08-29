console.log("...executing \\db\\models\\movie.js file...")

const Sequelize = require('sequelize');

module.exports = function (sequelize) {
   class Movie extends Sequelize.Model {

   };
   Movie.init({
      title: Sequelize.STRING
   }, {sequelize : sequelize});

   console.log("... executing module/exports within movie.js file ...")
   return Movie;
}

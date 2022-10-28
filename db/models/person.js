console.log('...executing \\db\\models\\person.js file....');

const Sequelize = require('sequelize');

module.exports = function (sequelize) {

   class Person extends Sequelize.Model {};

   Person.init({
      // Model attributes are defined here
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      firstName: {
         allowNull: false,
         validate: {
            notEmpty: {
               msg: "The first name field cannot be empty"
            }
         },
         type: require('sequelize').STRING
      },
      lastName: {
         type: Sequelize.STRING,
         allowNull: false,
         validate: {
            notEmpty: {
               msg: "The last name field cannot be empty"
            }
         }
      }
   }, {
   // model OPTIONS object, local
   // note that there is a GLOBAL options that can be set when initializing sequelize
      sequelize : sequelize,
      timestamps : false,
      createdAt : false
      // add more options here as you please
   })

   console.log("... executing module/exports within person.js file")
   return Person;

}
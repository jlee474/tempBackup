console.log("...executing \\db\\models\\movie.js file...")

const Sequelize = require('sequelize');

module.exports = function (sequelize) {
   class Movie extends Sequelize.Model {

   }

   Movie.init({
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      title: {
         type: Sequelize.STRING,
         allowNull: false,
         validate: {
            notEmpty: {
               msg: "title cannot be blank"
            },
            notNull: {
               msg: "value cannot be null"
            }
         }
      },
      runtime: {
         type: Sequelize.DataTypes.INTEGER, //Also Sequelize.INTEGER works here, for all instances
         allowNull: false,
         validate: {
            notNull: {
               msg: "value cannot be null"
            },
            min: {
               args: 1,
               msg: "The runtime must be at least one minute."
            }
         }
      },
      releaseDate: {
         type: Sequelize.DATEONLY,
         allowNull: false,
         validate: {
            notNull: {
               msg: "value cannot be null"
            },
            isAfter: {
               args: "1895-12-27",
               msg: "The release date must be after 1895-12-27"
            }
         }
      },
      isAvailableOnVHS: {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: false,
         validate: {
            notNull: {
               msg: "value cannot be null"
            }
         }
      }
   }, {
      // model OPTIONS object, local. 
      //   note that there is a GLOBAL options that can be set when initializing sequelize
      sequelize : sequelize,
      timestamps : false,
      createdAt: false,
      // freezeTableName: true,  // <-- disables plural table names
      tableName: "Jason's Cinema",
      // add more options here as you please
   });

   console.log("... executing module/exports within movie.js file ...")
   return Movie;
}

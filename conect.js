const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
 const sequelize = new Sequelize('ECOMMERCE', 'MERCADEO', 'Merc2025*', {
  host: '44.223.147.206',
  dialect: 'mssql' /*| 'db2' | 'snowflake' | 'oracle' */
});
try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  module.exports = sequelize

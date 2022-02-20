const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test-db', 'root', '1337wahbi', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
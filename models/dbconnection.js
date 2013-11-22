var Sequelize = require('sequelize');

// initialize database connection
exports.sequelize = new Sequelize('d5adfko5qnhupc', 'norkjiplytdgpw', '1N6gHWQOwXzIGTaI3NscWoOiYA', {
    host: 'ec2-54-217-239-27.eu-west-1.compute.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    omitNull: true
});

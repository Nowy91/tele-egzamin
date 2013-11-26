var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('user', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING(50)
        },
        password: {
            type: Sequelize.STRING(100)
        },
        firstname: {
            type: Sequelize.STRING(30)
        },
        lastname: {
            type: Sequelize.STRING(30)
        },
        email: {
            type: Sequelize.STRING(70)
        }
    });
}; 
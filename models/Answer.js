var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('answer', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        token: {
            type: Sequelize.STRING(20)
        },

        questionId: {
            type: Sequelize.INTEGER
        },

        content: {
            type: Sequelize.STRING
        }
    });
}; 
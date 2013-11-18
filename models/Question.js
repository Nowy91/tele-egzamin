var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('question', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING
        },
        maxPoints: {
            type: Sequelize.DECIMAL(6, 3)
        },
        examId: {
            type: Sequelize.INTEGER
        }
    });
}; 
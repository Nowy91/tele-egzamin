var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('grade', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        mark: {
            type: Sequelize.STRING(20)
        },
        threshold: {
            type: Sequelize.DECIMAL(4, 1)
        },
        examId: {
            type: Sequelize.INTEGER
        }
    });
}; 
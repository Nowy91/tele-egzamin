var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('grade', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        mark: {
            type: Sequelize.DECIMAL(2, 1)
        },
        percentPoints: {
            type: Sequelize.DECIMAL(4, 1)
        },
        examId: {
            type: Sequelize.INTEGER
        }
    });
}; 
var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('token', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING(20)
        },
        status: {
            type: Sequelize.STRING(20),
            defaultValue: 'active'
        },
        executedDate: {
            type: Sequelize.DATE
        },
        grade: {
            type: Sequelize.DECIMAL(2,1)
        },
        reachedPoints: {
            type: Sequelize.DECIMAL(6,3)
        }
    });
}; 
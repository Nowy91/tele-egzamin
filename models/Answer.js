var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('answer', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        reachedPoints: {
            type: Sequelize.DECIMAL(6, 3)
        },
        type: {
            // todo enum type against varchar
            type: Sequelize.STRING(20)
        }
    });
}; 
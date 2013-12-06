var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('question', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Pole nie może być puste."
                }
            }
        },
        maxPoints: {
            type: Sequelize.DECIMAL(6, 3),
            validate: {
                isFloat: {
                    args: true,
                    msg: "Pole musi być liczbą naturalną lub zmiennoprzecinkową."
                },
                notEmpty: {
                    args: true,
                    msg: "Pole nie może być puste."
                }
            }
        },
        examId: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        }
    });
}; 
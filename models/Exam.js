var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('exam', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING(50),
            validate: {
                max: {
                    args: 50,
                    msg: "Tytuł nie może składać się z więcej niż 50 znaków."
                },
                notEmpty: {
                    args: true,
                    msg: "Pole nie może być puste."
                }
            }
        },
        date: {
            type: Sequelize.DATE,
            validate: {
                isDate: {
                    args: true,
                    msg: "Zły format daty."
                },
                notEmpty: {
                    args: true,
                    msg: "Pole nie może być puste."
                }
            }
        },
        duration: {
            type: Sequelize.INTEGER,
            validate: {
                isNumeric: {
                    args: true,
                    msg: "Czas trwania musi być liczbą."
                },
                notEmpty: {
                    args: true,
                    msg: "Pole nie może być puste."
                }
            }
        },
        numberOfStudents: {
            type: Sequelize.INTEGER,
            validate: {
                isNumeric: {
                    args: true,
                    msg: "Liczba studentów musi być liczbą."
                },
                notEmpty: {
                    args: true,
                    msg: "Pole nie może być puste."
                }
            }
        },
        status: {
            type: Sequelize.STRING(20),
            defaultValue: 'ready'
        }
    });
}; 
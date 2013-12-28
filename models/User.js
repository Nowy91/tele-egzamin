var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('user', {

        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: Sequelize.STRING(50),
            validate: {
                len: {
                    args: [3, 20],
                    msg: "Login powinien liczyć od 3 do 25 znaków."
                },
                notEmpty: {
                    args: true,
                    msg: "Pole nie może być puste."
                }
            }
        },

        password: {
            type: Sequelize.STRING(100),
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Pole nie może być puste."
                }
            }
        },

        firstname: {
            type: Sequelize.STRING(30)
        },

        lastname: {
            type: Sequelize.STRING(30)
        },

        email: {
            type: Sequelize.STRING(70),
            allowNull: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Nieprawidłowy format adresu e-mail."
                },
                notEmpty: {
                    args: true,
                    msg: "Pole nie może być puste."
                }
            }
        },

        role: {
            type: Sequelize.STRING(20)
        }
    });
}; 
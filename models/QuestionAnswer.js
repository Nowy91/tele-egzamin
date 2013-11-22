var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

    return sequelize.define('question_answer', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.STRING
        },
        isCorrect: {
            type: Sequelize.BOOLEAN
        },
        questionId: {
            type: Sequelize.INTEGER
        }
    });
};
/*
 * Available only in NODE_ENV = 'development' 
 */

var sequelize = require('./../models/index').sequelize;
var models = require('./../models');
var crypto = require('crypto');
var User = models.User;
var Admin = models.Admin;
var Answer = models.Answer;
var Examiner = models.Examiner;
var Exam = models.Exam;
var Grade = models.Grade;
var QuestionAnswer = models.QuestionAnswer;
var Question = models.Question;
var Token = models.Token;

exports.init = function (req, res) {
    sequelize.sync().success(function () {

        Admin.destroy();
        Answer.destroy();
        Examiner.destroy();
        Exam.destroy();
        Grade.destroy();
        QuestionAnswer.destroy();
        Question.destroy();
        Token.destroy();
        User.destroy().success(function() {
            User.create({
                username: 'admin',
                password: crypto.createHash('sha1').update('admin').digest('hex'),
                email: 'admin@admin.pl',
                role: 'admin'
            }).success(function (u) {
                    Admin.create().success(function (admin) {
                        admin.setUser(u);
                    });
                });
        });
    });

    res.end();
};
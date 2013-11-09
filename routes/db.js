/*
 * Available only in NODE_ENV = 'development' 
 */

var sequelize = require('./../models/index').sequelize;
var models = require('./../models');
var Exam = models.Exam;

exports.init = function (req, res) {
    sequelize.sync().success(function () {
        Exam.create({
            title: 'Teoria sygnalow',
            date: '2012-01-25',
            duration: 30,
            numberOfStudents: 16,
            status: 'active'
        });
    });

    res.render('db', { title: 'Database has been synchronized'});
};
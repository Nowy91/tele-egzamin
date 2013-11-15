/*
 * GET home page.
 */

var models = require('./../models');
var Exam = models.Exam;

exports.index = function (req, res) {

    /*Exam.findAll().success(function(exams) {
     res.json(exams);
     });*/
    res.render('index.html');
}; 
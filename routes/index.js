var models = require('./../models');
var Exam = models.Exam;

exports.index = function (req, res) {
    res.render('index.html');
};
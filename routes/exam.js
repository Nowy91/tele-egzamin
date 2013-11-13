var models = require('./../models');
var Exam = models.Exam;

exports.list = function(req, res) {
    Exam.findAll()
        .success(function(exams) {
            res.json(exams);
        })
        .error(function(err) {
            res.end(err);
        });
};

exports.add = function(req, res) {
    Exam.create(req.body);
    res.end();
}
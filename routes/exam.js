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

exports.view = function(req, res) {
    Exam.find(req.params.id)
        .success(function(exam){
            res.json(exam);
        })
        .error(function(err) {
            res.end(err);
        });
}

exports.delete = function(req, res) {
    Exam.find(req.params.id)
        .success(function(exam){
            exam.destroy()
                .success(function(){
                    res.end();
            });
        })
        .error(function(err) {
            res.end(err);
        });
}
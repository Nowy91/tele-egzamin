var models = require('./../models');
var Exam = models.Exam;

exports.list = function (req, res) {
    Exam.findAll()
        .success(function (exams) {
            res.json(exams);
        })
        .error(function (err) {
            res.end(err);
        });
};

exports.add = function (req, res) {
    Exam.create(req.body)
        .success(function (exam) {
            var data = exam.dataValues;
            data.isValid = true;
            res.json(data);
        })
        .error(function (exam) {
            exam.isValid = false;
            res.json(exam);
        });
}

exports.view = function (req, res) {
    Exam.find(req.params.id)
        .success(function (exam) {
            res.json(exam);
        })
        .error(function (err) {
            res.end(err);
        });
}

exports.edit = function (req, res) {
    Exam.find(req.params.id)
        .success(function (exam) {
            exam.updateAttributes({
                title: req.body.title,
                date: req.body.date,
                numberOfStudents: req.body.numberOfStudents,
                duration: req.body.duration,
                status: req.body.status
            })
                .success(function (exam) {
                    var data = exam.dataValues;
                    data.isValid = true;
                    res.json(data);
                })
                .error(function (exam) {
                    exam.isValid = false;
                    res.json(exam);
                })
        })
}

exports.delete = function (req, res) {
    Exam.find(req.params.id)
        .success(function (exam) {
            exam.destroy()
                .success(function () {
                    res.end();
                });
        })
        .error(function (err) {
            res.end(err);
        });
}
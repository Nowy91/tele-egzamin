var models = require('./../models');
var Exam = models.Exam;
var Grade = models.Grade;
var Question = models.Question;

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
    Exam.create(req.body.exam)
        .success(function (exam) {
            if (req.body.grades != null) {
                Grade.bulkCreate(req.body.grades, ['threshold', 'mark'])
                    .success(function () {
                        Grade.findAll({where: {examId: null}})
                            .success(function (grades) {
                                exam.setGrades(grades);
                            });
                    });
            }
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
                duration: req.body.duration
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
            exam.getQuestions().success(function (questions) {
                questions.forEach(function (question) {
                    question.destroy();
                });
            });
            exam.destroy()
                .success(function () {
                    res.end();
                });
        })
        .error(function (err) {
            res.end(err);
        });
}

exports.activate = function (req, res) {
    Exam.find(req.params.id)
        .success(function (exam) {
            exam.updateAttributes({status: 'activated'})
                .success(function (updatedExam) {
                    res.json(updatedExam);
                })
                .error(function () {
                    res.status(500);
                });
        })
        .error(function () {
            res.status(500);
        });
}
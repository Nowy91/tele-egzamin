var models = require('./../models');
var User = models.User;
var Exam = models.Exam;
var Grade = models.Grade;
var Question = models.Question;

exports.test = function (req, res) {
    User.findAndCountAll().success(function(result) {
        res.json(result.count);
    });
};

exports.list = function (req, res) {
    if (req.user.role == 'admin') {
        Exam.findAll()
            .success(function (exams) {
                res.json(exams);
            })
            .error(function (err) {
                res.end(err);
            });
    }

    if (req.user.role == 'examiner') {
        Exam.findAll({where: {examinerId: req.user.id}})
            .success(function (exams) {
                res.json(exams);
            })
            .error(function (err) {
                res.end(err);
            });
    }
};

exports.add = function (req, res) {
    req.body.exam.examinerId = req.user.id;
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

exports.getGrades = function (req, res) {
    Grade.findAll({ where: {examId: req.params.id}})
        .success(function (grades) {
            res.json(grades);
        })
        .error(function (err) {
            res.end(err);
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
                title: req.body.exam.title,
                date: req.body.exam.date,
                numberOfStudents: req.body.exam.numberOfStudents,
                duration: req.body.exam.duration,
                gradesType: req.body.exam.gradesType
            })
                .success(function (exam) {
                    Grade.findAll({where: {examId: exam.id}}).success(function (oldgrades) {
                        if (oldgrades != null) {
                            for (var i = 0; i < oldgrades.length; i++) {
                                oldgrades[i].destroy();
                            }
                        }
                        if (req.body.grades != null) {
                            Grade.bulkCreate(req.body.grades, ['threshold', 'mark'])
                                .success(function () {
                                    Grade.findAll({where: {examId: null}})
                                        .success(function (grades) {
                                            exam.setGrades(grades);
                                        });
                                });
                        }
                    });
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
            Question.destroy({examId:exam.id});
            exam.destroy()
                .success(function () {
                    res.end();
                });
        })
        .error(function (err) {
            res.end(err);
        });
}

exports.execute = function (req, res) {
    Exam.find({
        where: {id: req.params.id},
        include: [ models.Token ]})
        .success(function (exam) {
            res.json(exam);
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

exports.deactivate = function (req, res) {
    Exam.find(req.params.id)
        .success(function (exam) {
            exam.updateAttributes({status: 'ready'})
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
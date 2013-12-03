var models = require('./../models');
var Question = models.Question;
var QuestionAnswer = models.QuestionAnswer;

exports.list = function (req, res) {
    Question.findAll({ where: {examId: req.params.id}})
        .success(function (questions) {
            res.json(questions);
        })
        .error(function (err) {
            res.end(err);
        });
};

exports.add = function (req, res) {
    Question.create(req.body)
        .success(function (question) {
            var data = question.dataValues;
            data.isValid = true;
            res.json(data);
        })
        .error(function (question) {
            question.isValid = false;
            res.json(question);
        });
}

exports.addAnswers = function (req, res) {
    QuestionAnswer.bulkCreate(req.body, ['content', 'isCorrect'])
        .success(function () {
            QuestionAnswer.findAll({where: {questionId: null}})
                .success(function (answers) {
                    Question.find(req.params.id).success(function (question) {
                        question.setQuestionAnswers(answers);
                        res.json(answers);
                    });
                });
        });
}

exports.getAnswers = function (req, res) {
    QuestionAnswer.findAll({ where: {questionId: req.params.id}})
        .success(function (answers) {
            res.json(answers);
        })
        .error(function (err) {
            res.end(err);
        });
}

exports.view = function (req, res) {
    Question.find(req.params.id)
        .success(function (question) {
            res.json(question);
        })
        .error(function (err) {
            res.end(err);
        });
}

exports.delete = function (req, res) {
    Question.find(req.params.id)
        .success(function (question) {
            question.destroy()
                .success(function () {
                    res.end();
                });
        })
        .error(function (err) {
            res.end(err);
        });
}

exports.edit = function (req, res) {
    Question.find(req.params.id)
        .success(function (question) {
            question.updateAttributes({content: req.body.content, maxPoints: req.body.maxPoints})
                .success(function () {
                    var data = question.dataValues;
                    data.isValid = true;
                    res.json(data);
                })
                .error(function (question){
                    question.isValid = false;
                    res.json(question);
                });
        })
        .error(function (err) {
            res.end(err);
        });
}

exports.editAnswers = function (req, res) {

    QuestionAnswer.bulkCreate(req.body, ['content', 'isCorrect','questionId']).success(function (newAnswers) {
        QuestionAnswer.findAll({where: {questionId: req.params.id}})
            .success(function (oldAnswers) {

                //if less
                if (oldAnswers.length > newAnswers.length) {
                    for (var i in newAnswers) {
                        oldAnswers[i].updateAttributes({content: newAnswers[i].content, isCorrect: newAnswers[i].isCorrect});
                    }
                    for (var i = newAnswers.length; i < oldAnswers.length; i++) {
                        oldAnswers[i].destroy();
                    }
                }
                else {
                    //if equal

                    for (var i in oldAnswers) {
                        oldAnswers[i].updateAttributes({content: newAnswers[i].content, isCorrect: newAnswers[i].isCorrect});
                    }

                    //if more
                    if (oldAnswers.length < newAnswers.length) {
                        for (var i = oldAnswers.length; i < newAnswers.length; i++) {
                            newAnswers[i].questionId = req.params.id;
                            QuestionAnswer.create(newAnswers[i]);
                        }
                    }
                }

                res.json(newAnswers);
            });
    });

}
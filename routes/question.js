var models = require('./../models');
var Question = models.Question;

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
            res.json(question);
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
            question.updateAttributes({content: req.body.content,maxPoints: req.body.maxPoints})
                .success(function () {
                    res.json(question);
                });
        })
        .error(function (err) {
            res.end(err);
        });
}
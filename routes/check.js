var models = require('./../models');
var Question = models.Question;
var QuestionAnswer = models.QuestionAnswer;
var Answer = models.Answer;
var Token = models.Token;

exports.getData = function (req, res) {
    Question.findAll({ where: {examId: req.params.examId}}).success(function (questions) {
        QuestionAnswer.findAll({ where: {questionId: getIdValueFrom(questions)}}).success(function (answers) {
            Answer.findAll({ where: {questionId: getIdValueFrom(questions), token: req.params.token}}).success(function (student) {
                res.json({ questions: questions, answers: answers, studentAnswers: student});
            })
                .error(function (err) {
                    res.json(err);
                });
        });
    });
}

exports.checked = function(req,res) {
    Token.find({where: {content: req.body.token}})
        .success(function (token) {
            token.updateAttributes({reachedPoints: req.body.reachedPoints, status: 'checked', grade: 5})
                .success(function (token) {
                    res.json(token);
                });
        })
        .error(function (err) {
            res.end(err);
        });
}

function getIdValueFrom(array) {
    var values = [];
    for (var i = 0; i < array.length; i++) {
        values.push(array[i].id);
    }
    return values;
}
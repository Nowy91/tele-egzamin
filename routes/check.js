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

exports.checked = function (req, res) {
    Token.find({where: {content: req.body.token}})
        .success(function (token) {

            Question.findAll({where: {examId: token.examId}})
                .success(function (questions) {
                    var maxPoints = 0;

                    questions.forEach(function (question) {
                        maxPoints += parseFloat(question.maxPoints);
                    });

                    var percentage = req.body.reachedPoints / maxPoints, finalGrade;

                    if (percentage < 0.5)finalGrade = 2.0;
                    else if (percentage < 0.6)finalGrade = 3.0;
                    else if (percentage < 0.7)finalGrade = 3.5;
                    else if (percentage < 0.8)finalGrade = 4.0;
                    else if (percentage < 0.9)finalGrade = 4.5;
                    else finalGrade = 5.0;

                    token.updateAttributes({reachedPoints: req.body.reachedPoints, status: 'checked', grade: finalGrade})
                        .success(function (token) {
                            res.json(token);
                        });
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
var models = require('./../models');
var Token = models.Token;
var Exam = models.Exam;
var Question = models.Question;
var QuestionAnswer = models.QuestionAnswer;
var Answer = models.Answer;

exports.check = function (req, res) {
    Token.find({ where: {content: req.params.token}})
        .success(function (token) {
            if ((token == null)||(token.status != 'active'))res.json(null);
            else {
                req.session.token = token.content;
                Exam.find({where: {id: token.examId}})
                    .success(function (exam) {
                        req.session.exam = exam.id;
                        res.json(exam);
                    });

            }
        })
        .error(function (err) {
            res.json(err);
        });
};

exports.getQuestions = function (req, res) {
    if (req.session.exam == req.params.examId) {
        Question.findAll({ where: {examId: req.params.examId}}).success(function (questions) {
            QuestionAnswer.findAll({ where: {questionId: getIdValueFrom(questions)}}).success(function (answers) {
                res.json({ questions: questions, answers: getContentFrom(answers)});
            })
        })
            .error(function (err) {
                res.json(err);
            });
    }
};

exports.saveAnswers = function (req, res) {
    if (req.session.token == req.params.token) {
        Answer.bulkCreate(req.body, ['questionId', 'token', 'content'])
            .success(function (answers) {
                Token.find({where: {content: req.params.token}})
                    .success(function (token) {
                        token.updateAttributes({
                            status: 'executed',
                            executedDate: new Date()
                        })
                    })
                res.json("OK");
            });



        req.session.destroy();
    }
};


function getIdValueFrom(array) {
    var values = [];
    for (var i = 0; i < array.length; i++) {
        values.push(array[i].id);
    }
    return values;
}

function getContentFrom(array) {
    var values = [];
    for (var i = 0; i < array.length; i++) {
        values.push({content: array[i].content, questionId: array[i].questionId});
    }
    return values;
}



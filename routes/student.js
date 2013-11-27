var models = require('./../models');
var Token = models.Token;
var Exam = models.Exam;
var Question = models.Question;

exports.check = function (req, res) {
    Token.find({ where: {content: "3757e2a"}})  //req.params.token}})
        .success(function (token) {
            if (token == null)res.json(token);
            else
            {
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
    if(req.session.exam == req.params.examId)
    {
    Question.findAll({ where: {examId: req.params.examId}})
        .success(function (questions) {
            res.json(questions);
        })
        .error(function (err) {
            res.json(err);
        });
    }
};


var models = require('./../models');
var fs = require('fs');
var Token = models.Token;
var Exam = models.Exam;
var Question = models.Question;
var QuestionAnswer = models.QuestionAnswer;
var Answer = models.Answer;

exports.check = function (req, res) {
    Token.find({ where: {content: req.params.token}})
        .success(function (token) {
            if ((token == null) || (token.status != 'active'))res.json(null);
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
    //if (req.session.exam == req.params.examId) {
        Question.findAll({ where: {examId: req.params.examId}}).success(function (questions) {


            questions.forEach(function (model) {
                if(model.imageName != "")
                {
                var newPath = __dirname;
                newPath = newPath.replace("\\routes", '/public/images/') + model.imageName;

                var base64_data = new Buffer(fs.readFileSync(newPath).toString('base64'));
                model.imageName = 'data:image/jpg;base64,' + base64_data + '>';
                }
            });


            QuestionAnswer.findAll({ where: {questionId: getIdValueFrom(questions)}}).success(function (answers) {
                res.json({ questions: questions, answers: getContentFrom(answers)});
            })
        })
            .error(function (err) {
                res.json(err);
            });
    //}
};

exports.saveImageAnswers = function (req, res) {
    if (req.session.token == req.params.token) {
        req.body.forEach(function (image) {
            var base64Data = image.content.replace(/^data:image\/png;base64,/, "");
            var filePath = __dirname;
            var fileName = image.token + image.questionId + ".png";
            filePath = filePath.replace("routes", 'public/images/student/') + fileName;
            fs.writeFile(filePath, base64Data, 'base64', function (err) {
            });
            Answer.create({questionId: image.questionId, token: image.token, content: fileName});
        });
        Token.find({where: {content: req.params.token}})
            .success(function (token) {
                token.updateAttributes({
                    status: 'executed',
                    executedDate: new Date()
                })
            })
        res.json("OK");
    }
}


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



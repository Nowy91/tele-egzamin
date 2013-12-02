var models = require('./../models');
var Token = models.Token;
var Exam = models.Exam;
var crypto = require('crypto');

exports.list = function (req, res) {
    Token.findAll({ where: { examId: req.params.examId, status: req.params.status}})
        .success(function (tokens) {
            res.json(tokens);
        })
        .error(function () {
            res.end();
        });
}

exports.generate = function (req, res) {
    var tokens = randTokens(7, req.body.numberOfStudents);

    tokens.forEach(function(token) {
        token.examId = req.body.id;
    });

    Token.bulkCreate(tokens, ['content', 'examId']).success(function () {
        Token.findAll({where: {content: getTokensValueFrom(tokens)}}).success(function (tokens) {
            Exam.find(req.body.id).success(function (exam) {
                res.json(tokens);
            });
        });
    });
}

function randTokens(length, amount) {
    var tokens = [];
    var amount = amount || 1;

    for (var i = 0; i < amount; i++) {
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var hash = crypto.createHash('sha1').update(current_date + random).digest('hex');

        tokens.push({content: hash.substring(0, length)});
    }

    return tokens;
}

function getTokensValueFrom(array) {
    var values = [];

    for (var i = 0; i < array.length; i++) {
        values.push(array[i].content);
    }

    return values;
}
var models = require('./../models');
var Question = models.Question;

exports.list = function(req, res) {
    Question.findAll({ where: {examId:req.params.id}})
        .success(function(questions) {
            res.json(questions);
        })
        .error(function(err) {
            res.end(err);
        });
};
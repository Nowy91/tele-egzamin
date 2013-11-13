var models = require('./../models');
var User = models.User;

exports.list = function(req, res) {
    User.findAll()
        .success(function(exams) {
            res.json(exams);
        })
        .error(function(err) {
            res.end(err);
        });
};
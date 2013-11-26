var models = require('./../models');
var passwordHash = require('password-hash');
var User = models.User;
var Examiner = models.Examiner;

exports.list = function(req, res) {
    Examiner.findAll({include: [{model: User, as: User.tableName}]}).success(function(examiners) {
            res.json(examiners);
        })
};
exports.add = function(req, res) {

    req.body.password = passwordHash.generate(req.body.password);

    User.create(req.body).success(function(user) {
        Examiner.create().success(function(examiner) {
            examiner.setUser(user).success(function(){
                Examiner.find({ where: {id: examiner.id}, include: [{model: User, as: User.tableName}]}).success(function(examiner2){
                    res.json(examiner2);
                });
            });
        });
    });
};
exports.view = function(req, res) {
    Examiner.find({ where: {id: req.params.id}, include: [{model: User, as: User.tableName}]}).success(function(examiner){
        res.json(examiner);
    });
};
exports.delete = function(req, res){
    Examiner.find(req.params.id).success(function(examiner){
        examiner.getUser().success(function(user){
            user.destroy().success(function(){
                res.end();
            });
        });
        examiner.destroy();
    });
};
exports.edit = function(req, res){
    if(typeof req.body.password === 'string')
    req.body.password = passwordHash.generate(req.body.password);

    Examiner.find(req.params.id).success(function(examiner){
        examiner.getUser().success(function(user){
            user.updateAttributes(req.body).success(function(newUser){
                res.json(newUser);
            });
        });
    });
};

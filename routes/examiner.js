var models = require('./../models');
var crypto = require('crypto');
var User = models.User;
var Examiner = models.Examiner;
var Exam = models.Exam;
var Question = models.Question;

exports.list = function(req, res) {
    Examiner.findAll({include: [{model: User, as: User.tableName}]}).success(function(examiners) {
            res.json(examiners);
        })
};

exports.add = function(req, res) {
    var confirmPassword = req.body.confirmPassword;
    delete req.body.confirmPassword;

    var confirmPasswordError = {};

    if (confirmPassword === '') {
        confirmPasswordError.confirmPassword = ['Pole nie może być puste.'];
    }
    else if (confirmPassword !== req.body.password) {
        confirmPasswordError.confirmPassword = ['Niezgodność haseł.'];
    }

    req.body.password = crypto.createHash('sha1').update(req.body.password).digest('hex');
    req.body.role = 'examiner';

    var u = User.build(req.body);
    var otherErrors = {};

    validation = u.validate().success(function(errors) {
        if (errors !== undefined) {
            otherErrors = errors;
        }
    });

    validation.done(function() {
        var errors = Collect(confirmPasswordError, otherErrors);

        if (Object.keys(errors).length == 0) {
            u.save().success(function(user) {
                Examiner.create().success(function(examiner) {
                    examiner.setUser(user).success(function(e){
                        Examiner.find({ where: {id: examiner.id}, include: [{model: User, as: User.tableName}]}).success(function(examiner2){
                            var data = examiner2.toJSON();
                            data.isValid = true;
                            res.json(data);
                        });
                    });
                });
            });
        }
        else {
            errors.isValid = false;
            res.json(errors);
        }
    });
};

exports.view = function(req, res) {
    Examiner.find({ where: {id: req.params.id}, include: [{model: User, as: User.tableName}]}).success(function(examiner){
        res.json(examiner);
    });
};

exports.delete = function(req, res){
    Examiner.find(req.params.id).success(function(examiner){
        Exam.findAll({where: {examinerId: examiner.userId}}).success(function(exams){
            exams.forEach(function(exam){
                Question.destroy({examId:exam.id});
            });
        });
        Exam.destroy({examinerId: examiner.userId});
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

function Collect(ob1, ob1) {
    var ret = {},
        len = arguments.length,
        arg,
        i = 0,
        p;

    for (i = 0; i < len; i++) {
        arg = arguments[i];
        if (typeof arg !== "object") {
            continue;
        }
        for (p in arg) {
            if (arg.hasOwnProperty(p)) {
                ret[p] = arg[p];
            }
        }
    }

    return ret;
}
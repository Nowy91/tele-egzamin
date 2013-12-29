var models = require('./../models');
var Question = models.Question;
var QuestionAnswer = models.QuestionAnswer;
var Answer = models.Answer;
var Token = models.Token;
var Exam = models.Exam;
var Grade = models.Grade;

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

                    var percentage = (req.body.reachedPoints * 100) / maxPoints, finalGrade;
                    var grades = [];
                    var thresholds = [];

                    Exam.find({where: {id: token.examId}}).success(function (examGrade) {
                        if(examGrade.gradesType == "custom")
                        {
                            Grade.findAll({where:{examId: examGrade.id}, order: 'threshold'}).success(function(customGrades){
                                customGrades.forEach(function(singleGrade){
                                    grades.push(singleGrade.mark);
                                    thresholds.push(parseFloat(singleGrade.threshold));
                                })
                                var num = 0;
                                while (percentage > thresholds[num]) {
                                    num++;
                                }
                                finalGrade = grades[num];
                                token.updateAttributes({reachedPoints: req.body.reachedPoints, status: 'checked', grade: finalGrade})
                                    .success(function (token) {
                                        res.json(token);
                                    });
                            });
                        } else {
                            if (examGrade.gradesType == "study") {
                                grades = [2.0, 3.0, 3.5, 4.0, 4.5, 5.0];
                                thresholds = [50, 60, 70, 80, 90, 100];
                            } else if (examGrade.gradesType == "school") {
                                grades = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
                                thresholds = [40, 55, 70, 85, 99, 100];
                            } else if (examGrade.gradesType == "credit") {
                                grades = ["nzal", "zal"];
                                thresholds = [50, 100];
                            }

                            var num = 0;
                            while (percentage > thresholds[num]) {
                                num++;
                            }
                            finalGrade = grades[num];
                            token.updateAttributes({reachedPoints: req.body.reachedPoints, status: 'checked', grade: finalGrade})
                                .success(function (token) {
                                    res.json(token);
                                });
                        }


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
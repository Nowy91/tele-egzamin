var models = require('./../models');
var fs = require('fs');
var http = require("http");
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

    Question.findAll({ where: {examId: req.params.examId}}).success(function (questions) {


        /*questions.forEach(function (model) {
         if (model.imageName != "") {

         http.get(model.imageName, function (res) {

         var buffers = [];
         var length = 0;

         res.on("data", function (chunk) {

         // store each block of data
         length += chunk.length;
         buffers.push(chunk);

         });

         res.on("end", function () {

         // combine the binary data into single buffer


         var base64_data = new Buffer(buffers).toString('base64');
         model.imageName = 'data:image/jpg;base64,' + base64_data + '>';

         });

         });


         }
         });*/


        QuestionAnswer.findAll({ where: {questionId: getIdValueFrom(questions)}}).success(function (answers) {
            res.json({ questions: questions, answers: getContentFrom(answers)});
        })
    })
        .error(function (err) {
            res.json(err);
        });

};

exports.saveImageAnswers = function (req, res) {

    console.log(req.body)
    req.body.forEach(function (image) {
        Answer.create({questionId: image.questionId, token: image.token, content: image.content})
    });

    /*req.body.forEach(function (image) {
     //var base64Data = image.content.replace(/^data:image\/png;base64,/, "");
     //var filePath = __dirname;
     //var fileName = image.token + image.questionId + ".png";
     //filePath = filePath.replace("routes", 'public/images/student/') + fileName;
     //fs.writeFile(filePath, base64Data, 'base64', function (err) {
     //});
     //Answer.create({questionId: image.questionId, token: image.token, content: fileName});

     var client = new transloadit('7989f49068cf11e38937ab04efb3d54d', 'caf40053fcf82d49cb760df02b84e63cd34b474f');
     var params = {
     steps: {
     redirect_to : {
     robot : "/image/resize",
     use : ":original",
     width : 300,
     height: 300
     }
     }
     };
     client.addFile(image.content);


     client.send(params, function (ok) {
     // success callback [optional]
     console.log('Success: ' + JSON.stringify(ok));
     }, function (err) {
     // error callback [optional]
     console.log('Error: ' + JSON.stringify(err));
     });

     });
     */
    Token.find({where: {content: req.params.token}})
        .success(function (token) {
            token.updateAttributes({
                status: 'executed',
                executedDate: new Date()
            })
        })
    res.json("OK");

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



Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var myExam;
    var myQuestions;
    var myAnswers;
    var currentQuestion;
    var currentAnswer;

    Controller.Student = {
        check: function (token) {

            var checkToken = $.ajax({
                type: 'GET',
                url: '/student/check/' + token,
                dataType: 'json'
            });

            $.whenDone(checkToken, function (exam) {
                if (exam != null) {
                    layout = new App.Layouts.Student;
                    myExam = new App.Models.Exam(exam);
                    myExam.set('currentToken', token);
                    var startView = new App.Views.StudentStart({model: myExam});

                    Teleegzam.mainRegion.show(layout);

                    layout.exam.show(startView)
                }
                else {
                    alert("ZŁY TOKEN!");
                }
            });
        },

        start: function () {
            var getQuestions = $.ajax({
                type: 'GET',
                url: '/student/get/' + myExam.id,
                dataType: 'json'
            });

            $.whenDone(getQuestions, function (data) {

                myQuestions = new App.Collections.Questions(data.questions);
                myAnswers = new App.Collections.QuestionAnswers(data.answers);

                window.localStorage.clear();

                myExam.set('questionNumber', myQuestions.length);
                var examView = new App.Views.StudentExam({model: myExam});
                layout.exam.show(examView);

                currentQuestion = myQuestions.at(0);
                currentAnswer = new App.Models.Answer;
                Teleegzam.Controllers.Student.changeQuestion(0, "");
            });
        },

        changeQuestion: function (number, answer) {
            localStorage.setItem('answer' + currentQuestion.id, JSON.stringify(answer));

            currentQuestion = myQuestions.at(number);
            var questionView = new App.Views.StudentQuestion({model: myQuestions.at(number)});
            layout.question.show(questionView);

            if (currentQuestion.get('type') == "open" || currentQuestion.get('type') == "video") {
                currentAnswer.set({answer: JSON.parse(localStorage.getItem('answer' + currentQuestion.id))});
                var answerView = new App.Views.StudentOpenAnswer({model: currentAnswer});
                layout.answer.show(answerView);
            }
            else if (currentQuestion.get('type') == "closed") {
                var thisAnswers = new App.Collections.QuestionAnswers;
                for (var i = 0; i < myAnswers.length; i++) {
                    myAnswers.at(i).set({isSet: false})
                    if (myAnswers.at(i).get('questionId') == currentQuestion.get('id'))
                        thisAnswers.push(myAnswers.at(i));
                }
                var checked = JSON.parse(localStorage.getItem('answer' + currentQuestion.id));
                if (checked)
                    for (var i = 0; i < thisAnswers.length; i++)
                        if (checked.indexOf(thisAnswers.at(i).get('content')) >= 0)
                            thisAnswers.at(i).set({isSet: true});

                var questionAnswers = new App.Views.StudentCheckAnswerList({collection: thisAnswers});
                layout.answer.show(questionAnswers);
            }
            else if (currentQuestion.get('type') == "image") {
                currentAnswer.set({imageName: currentQuestion.get('imageName')});
                currentAnswer.set({saveImage: JSON.parse(localStorage.getItem('answer' + currentQuestion.id))});
                var canvasView = new App.Views.StudentImageAnswer({model: currentAnswer});
                layout.answer.show(canvasView);
            }
        },

        saveAnswers: function () {
            var answers = new App.Collections.Answers;
            var imagesAnswers = new App.Collections.Answers;
            var hash = 0;

            for (var i = 0; i < myQuestions.length; i++) {
                currentQuestion = myQuestions.at(i);
                var answer = new App.Models.Answer;
                answer.set('questionId', currentQuestion.id);
                answer.set('token', myExam.get('currentToken'));
                answer.set('content', JSON.parse(localStorage.getItem('answer' + currentQuestion.id)));
                var answerToHash = localStorage.getItem('answer' + currentQuestion.id);
                hash += CryptoJS.MD5(answerToHash);
                if ((answer.get('content') != "") && (answer.get('content') != null)) {
                    //if (currentQuestion.get('type') == "image")
                    //    imagesAnswers.push(answer);
                    //else
                        answers.push(answer);
                }
            }

            //if (answers.length != 0) {
                var sendAnswers = $.ajax({
                    type: 'POST',
                    url: '/student/answers/' + myExam.get('currentToken'),
                    data: JSON.stringify(answers),
                    contentType: 'application/json',
                    dataType: 'json'
                });
   //         }
/*
            if (imagesAnswers.length != 0) {
                var uploadView = new App.Views.StudentUploadList({collection: imagesAnswers});
                 layout.removeRegion("question");
                 layout.removeRegion("answer");

                 layout.exam.show(uploadView);

                var sendImageAnswers = $.ajax({
                    type: 'POST',
                    url: '/student/images/' + myExam.get('currentToken'),
                    data: JSON.stringify(imagesAnswers),
                    contentType: 'application/json',
                    dataType: 'json'
                });
            }*/

            window.localStorage.clear();
            var loginView = new App.Views.Login;
            Teleegzam.mainRegion.show(loginView);
            return hash;
        },

        login: function (token) {
            var authentification = $.ajax({
                type: 'POST',
                url: '/login2',
                data: token.toJSON()
            });

            $.when(authentification).done(function (logging) {
                if (logging.status == 'fail') {
                    $.notify(logging.message);
                }

                if (logging.status == 'ok') {
                    Teleegzam.Session = logging.session;
                    Controller.Student.check(logging.session.passport.token);
                }
            });
        }
    }
});
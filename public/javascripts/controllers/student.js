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

            $.when(checkToken).done(function (exam) {
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

            $.when(getQuestions).done(function (data) {

                myQuestions = new App.Collections.Questions(data.questions);
                myAnswers = new App.Collections.QuestionAnswers(data.answers);

                myExam.set('questionNumber', myQuestions.length);
                var examView = new App.Views.StudentExam({model: myExam});
                layout.exam.show(examView);

                window.localStorage.clear();

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

            if (currentQuestion.get('type') == "open") {
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
        },

        saveAnswers: function () {
            var answers = new App.Collections.Answers;

            for (var i = 0; i < myQuestions.length; i++) {
                currentQuestion = myQuestions.at(i);
                var answer = new App.Models.Answer;
                answer.set('questionId', currentQuestion.id);
                answer.set('token', myExam.get('currentToken'));
                answer.set('content', JSON.parse(localStorage.getItem('answer' + currentQuestion.id)));
                if ((answer.get('content') != "") && (answer.get('content') != null))answers.push(answer);
            }

            if (answers.length != 0) {
                var sendAnswers = $.ajax({
                    type: 'POST',
                    url: '/student/answers/' + myExam.id,
                    data: JSON.stringify(answers),
                    contentType: 'application/json',
                    dataType: 'json'
                });
            }

            var loginView = new App.Views.Login;
            Teleegzam.mainRegion.show(loginView);
        }
    }
});
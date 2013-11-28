Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {
    var myExam;
    var layout;
    var myQuestions;
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

            $.when(getQuestions).done(function (questions) {
                myQuestions = new App.Collections.Questions(questions);

                myExam.set('questionNumber', myQuestions.length);
                var examView = new App.Views.StudentExam({model: myExam});
                layout.exam.show(examView);

                currentQuestion = myQuestions.at(0);
                var questionView = new App.Views.StudentQuestion({model: myQuestions.at(0)});
                layout.question.show(questionView);

                currentAnswer = new App.Models.Answer({answer: ""});
                var answerView = new App.Views.StudentAnswer({model: currentAnswer});
                layout.answer.show(answerView);

                window.localStorage.clear();
            });
        },

        changeQuestion: function (number, answer) {
            localStorage.setItem('answer' + currentQuestion.id, JSON.stringify(answer));

            currentQuestion = myQuestions.at(number);
            var questionView = new App.Views.StudentQuestion({model: myQuestions.at(number)});
            layout.question.show(questionView);

            currentAnswer.set({answer: JSON.parse(localStorage.getItem('answer' + currentQuestion.id))});
            var answerView = new App.Views.StudentAnswer({model: currentAnswer});
            layout.answer.show(answerView);
        },

        saveAnswers: function () {
            var answers = new App.Collections.Answers;

            for (var i = 0; i < myQuestions.length; i++) {
                currentQuestion = myQuestions.at(i);
                var answer = new App.Models.Answer;
                answer.set('questionId', currentQuestion.id);
                answer.set('token', myExam.get('currentToken'));
                answer.set('content', JSON.parse(localStorage.getItem('answer' + currentQuestion.id)));
                answers.push(answer);
            }

            console.log(JSON.stringify(answers));

            var sendAnswers = $.ajax({
                type: 'POST',
                url: '/student/answers/' + myExam.id,
                data: JSON.stringify(answers),
                contentType: 'application/json',
                dataType: 'json'
            });

            $.when(sendAnswers).done(function () {
                var loginView = new App.Views.Login;
                Teleegzam.mainRegion.show(loginView);
            });
        }
    }
});
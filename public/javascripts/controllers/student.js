Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {
    var myExam;
    var layout;
    var myQuestions;
    var currentQuestion;

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
                currentQuestion = 0;
                var questionView = new App.Views.StudentQuestion({model: myQuestions.at(0)});
                layout.question.show(questionView);

            });
        },

        changeQuestion: function (number, answer) {
            localStorage.setItem('answer' + currentQuestion, JSON.stringify(answer));
            currentQuestion = number;
            var questionView = new App.Views.StudentQuestion({model: myQuestions.at(number)});
            layout.question.show(questionView);
        },

        saveAnswers: function () {
            var answers = "";
            for (var i = 0; i < myQuestions.length; i++) {
                answers += JSON.parse(localStorage.getItem('answer' + i)) + "||";
            }
            console.log(answers);

        }
    }
});
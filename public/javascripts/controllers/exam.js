Teleegzam.module('ExamController', function(Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;
    var examModel;
    var examId;
    var questionId;

    Controller.showAll = function() {
        layout = new App.Layouts.Dashboard;

        var fetchingExams = $.ajax({
            type: 'GET',
            url: '/exams',
            dataType: 'json'
        });

        $.when(fetchingExams).done(function (exams) {

            collection = new App.Collections.Exams(exams);
            var examsList = new App.Views.ExamList({collection: collection});

            layout.on("show", function () {
                layout.header.show(new App.Views.Header);
                layout.menu.show(new App.Views.Menu);
                layout.content.show(examsList);
            });

            Teleegzam.mainRegion.show(layout);
        });
    }

    Controller.showExam = function(path) {
        examId = path.toString().split('/')[5];

        var getExam = $.ajax({
            type: 'GET',
            url: '/exam/view/' + examId,
            dataType: 'json'
        });

        $.when(getExam).done(function (exam) {
            examModel = new App.Models.Exam(exam);
            layout.menu.show(new App.Views.ExamMenu);
            layout.content.show(new App.Views.ExamView({model: examModel}));
        });
    }

    Controller.addForm = function() {
        var addExamView = new App.Views.ExamAdd({collection: collection});
        layout.content.show(addExamView);
    }

    Controller.addExam = function(exam) {

        var addExam = $.ajax({
            type: 'POST',
            url: '/exam/add',
            data: exam.toJSON(),
            dataType: 'json'
        });

        $.when(addExam).done(function(newExam) {
            collection.add(newExam);
            var examsList = new App.Views.ExamList({collection: collection});
            layout.content.show(examsList);
        });
    }

    Controller.deleteExam = function (path) {
        var examId = path.toString().split('/')[5];

        var deleteExam = $.ajax({
            type: 'DELETE',
            url: '/exam/delete/' + examId
        });

        $.when(deleteExam).done(function () {
            var deletedModel = collection.get(examId);
            collection.remove(deletedModel);

            var examsList = new App.Views.ExamList({collection: collection});

            layout.menu.show(new App.Views.Menu);
            layout.content.show(examsList);
        });
    }

    Controller.showQuestions = function() {

        var getQuestions = $.ajax({
            type: 'GET',
            url: '/exam/view/'+examId+'/questions',
            dataType: 'json'
        });
        $.when(getQuestions).done(function (questions) {

            collection = new App.Collections.Questions(questions);
            var questionsList = new App.Views.QuestionList({collection: collection, model: examModel});

            layout.content.show(questionsList);

        });
    }

    Controller.addQuestionForm = function(){
        var addQuestionView = new App.Views.QuestionAdd({model: examModel});
        layout.content.show(addQuestionView);
    }

    Controller.addQuestion = function(question) {

        var addExam = $.ajax({
            type: 'POST',
            url: '/questions/add',
            data: question.toJSON(),
            dataType: 'json'
        });

        $.when(addExam).done(function(newQuestion) {
            collection.add(newQuestion);
            var questionList = new App.Views.QuestionList({collection: collection, model: examModel});
            layout.content.show(questionList);
        });
    }

    Controller.showQuestion = function(path) {

        var getExam = $.ajax({
            type: 'GET',
            url: path,
            dataType: 'json'
        });

        $.when(getExam).done(function (question) {
            var questionModel = new App.Models.Question(question);
            layout.content.show(new App.Views.QuestionView({model: questionModel}));
            questionId = questionModel.id;
        });
    }

    Controller.deleteQuestion = function () {

        var deleteQuestion = $.ajax({
            type: 'DELETE',
            url: '/questions/delete/' + questionId
        });

        $.when(deleteQuestion).done(function () {
            var deletedModel = collection.get(questionId);
            collection.remove(questionId);

            var questionsList = new App.Views.QuestionList({collection: collection, model: examModel});

            layout.content.show(questionsList);
        });
    }
});
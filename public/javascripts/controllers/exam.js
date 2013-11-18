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

    Controller.getModel = function (type) {
        if(type == "examModel")return examModel;
        else if(type == "layout")return layout;
        else if(type == "examId")return examId;
    }
});
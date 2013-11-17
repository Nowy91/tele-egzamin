Teleegzam.module('ExamController', function(Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;

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

    Controller.addForm = function() {
        var addExamView = new App.Views.ExamAdd({collection: collection});
        layout.content.show(addExamView);
    }

    Controller.addExam = function(exam) {

        var addExam = $.ajax({
            type: 'POST',
            url: '/exam/add',
            data: exam.toJSON()
        });

        $.when(addExam).done(function() {
            collection.add(exam);
            var examsList = new App.Views.ExamList({collection: collection});
            layout.content.show(examsList);
        });
    }

});
Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;
    var examModel;

    Controller.Exam = {

        showAll: function () {
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
        },
        showExam: function (examId) {
            examModel = collection.get(examId);
            layout.menu.show(new App.Views.ExamMenu);
            layout.content.show(new App.Views.ExamView({model: examModel}));
        },
        addForm: function () {
            var addExamView = new App.Views.ExamAdd({collection: collection});
            layout.content.show(addExamView);
        },

        addExam: function (exam) {

            var addExam = $.ajax({
                type: 'POST',
                url: '/exam/add',
                data: exam.toJSON(),
                dataType: 'json'
            });

            $.when(addExam).done(function (newExam) {
                collection.add(newExam);
                var examsList = new App.Views.ExamList({collection: collection});
                layout.content.show(examsList);
            });
        },

        deleteExam: function (examId) {
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
        },

        getModel: function (type) {
            if (type == "examModel")return examModel;
            else if (type == "layout")return layout;
        }
    }
});
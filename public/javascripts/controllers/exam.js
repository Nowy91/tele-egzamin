Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;
    var examModel;
    var examsList;

    Controller.Exam = {
        showAll: function () {
            layout = new App.Layouts.Dashboard;

            collection = new App.Collections.Exams;
            var fetching = collection.fetch();

            $.when(fetching).done(function() {
                examsList = new App.Views.ExamList({collection: collection});

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
            layout.menu.show(new App.Views.ExamMenu({model: examModel}));
            layout.content.show(new App.Views.ExamView({model: examModel}));
        },

        addForm: function () {
            layout.content.show(new App.Views.ExamAdd);
        },

        editForm: function (examId) {
            examModel = collection.get(examId);
            layout.content.show(new App.Views.ExamEdit({model: examModel}));
        },

        addExam: function (exam) {
            var addExam = $.ajax({
                type: 'POST',
                url: '/exam/add',
                data: exam.toJSON(),
                dataType: 'json'
            });

            $.when(addExam)
                .done(function (newExam) {
                    if (newExam.isValid) {
                        collection.add(newExam);
                        layout.content.show(new App.Views.ExamList({collection: collection}));
                    }
                    else {
                        Teleegzam.Validator.Form.messages(newExam);
                    }
                });
        },

        editExam: function (exam) {
            var editExam = $.ajax({
                type: 'POST',
                url: '/exam/edit/' + exam.id,
                data: exam.toJSON(),
                dataType: 'json'
            });

            $.when(editExam).done(function (editedExam) {
                if(editedExam.isValid) {
                    var oldExam = collection.get(exam.id);
                    collection.remove(oldExam);
                    collection.add(editedExam);

                    layout.menu.show(new App.Views.Menu);
                    layout.content.show(new App.Views.ExamList({collection: collection}));
                }
                else {
                    Teleegzam.Validator.Form.messages(editedExam);
                }
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

                layout.menu.show(new App.Views.Menu);
                layout.content.show(new App.Views.ExamList({collection: collection}));
            });
        },

        getModel: function (type) {
            if (type == "examModel")
                return examModel;
            else
                return layout;
        }
    }
});
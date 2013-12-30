Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;
    var examModel;
    var examsList;

    Controller.Exam = {
        showAll: function () {
            layout = new App.Layouts.Dashboard;

            var fetching = $.ajax({
                type: 'GET',
                url: '/exams',
                dataType: 'json'
            });

            $.whenDone(fetching, function (exams) {

                collection = new App.Collections.Exams(exams);
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
            if (examModel.get("gradesType") == "custom") {
                console.log("WYSYŁAM");
                var getExamGrades = $.ajax({
                    type: 'GET',
                    url: '/exam/view/' + examModel.id + '/grades',
                    dataType: 'json'
                });

                $.whenDone(getExamGrades, function (grades) {
                    console.log(grades);
                    var gradesCollection = new App.Collections.Grades(grades);
                    var gradesList = new App.Views.ExamGradeList({collection: gradesCollection});
                    layout.addRegion('grades', "#grades");
                    layout.grades.show(gradesList);
                });
            }
        },

        addForm: function () {
            layout.content.show(new App.Views.ExamAdd);
        },

        editForm: function (examId) {
            examModel = collection.get(examId);
            layout.content.show(new App.Views.ExamEdit({model: examModel}));
        },

        addExam: function (exam, grades) {
            var addExam = $.ajax({
                type: 'POST',
                url: '/exam/add',
                data: JSON.stringify({exam: exam, grades: grades}),
                contentType: 'application/json',
                dataType: 'json'
            });

            $.whenDone(addExam, function (newExam) {
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

            $.whenDone(editExam, function (editedExam) {
                if (editedExam.isValid) {
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

        activate: function (examId, socket) {
            var activatingExam = $.ajax({
                type: 'POST',
                url: '/exam/activate/' + examId,
                contentType: 'json'
            });

            $.whenDone(activatingExam, function (exam) {
                if (exam.status === 'activated') {
                    socket.emit('exam activation', examId);
                }
                else {
                    return false;
                }
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
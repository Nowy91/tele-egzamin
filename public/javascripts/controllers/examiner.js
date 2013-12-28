Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;
    var examinerModel;

    Controller.Examiner = {
        showAll: function () {
            layout = new App.Layouts.Dashboard;
            var fetchingExaminers = $.ajax({
                type: 'GET',
                url: '/examiners',
                dataType: 'json'
            });

            $.whenDone(fetchingExaminers, function (examiners) {
                collection = new App.Collections.Examiners(examiners);
                var examinersList = new App.Views.ExaminerList({collection: collection});

                layout.on("show", function () {
                    layout.header.show(new App.Views.Header);
                    layout.menu.show(new App.Views.MenuAdmin);
                    layout.content.show(examinersList);
                });

                Teleegzam.mainRegion.show(layout);
            });
        },

        showExaminer: function (examinerId) {
            examinerModel = collection.get(examinerId);
            layout.menu.show(new App.Views.ExaminerMenu);
            layout.content.show(new App.Views.ExaminerView({model: examinerModel}));
        },

        addForm: function () {
            layout.content.show(new App.Views.ExaminerAdd);
        },

        editForm: function (examinerId) {
            examinerModel = collection.get(examinerId);
            layout.content.show(new App.Views.ExaminerEdit({model: examinerModel}));
        },

        addExaminer: function (examiner) {
            var addExaminer = $.ajax({
                type: 'POST',
                url: '/examiner/add',
                data: examiner.toJSON(),
                dataType: 'json'
            });

            $.whenDone(addExaminer, function (examiner) {
                if (examiner.isValid) {
                    collection.add(examiner);
                    layout.menu.show(new App.Views.MenuAdmin);
                    layout.content.show(new App.Views.ExaminerList({collection: collection}));
                }
                else {
                    Teleegzam.Validator.Form.messages(examiner);
                }
            });
        },

        editExaminer: function (user, examinerId) {
            var editExaminer = $.ajax({
                type: 'POST',
                url: '/examiner/edit/' + examinerId,
                data: JSON.stringify(user),
                contentType: 'application/json',
                dataType: 'json'
            });

            $.whenDone(editExaminer, function (user) {
                examinerModel = collection.get(examinerId);
                examinerModel.set("user", user);
                layout.menu.show(new App.Views.MenuAdmin);
                layout.content.show(new App.Views.ExaminerView({model: examinerModel}));
            });
        },

        deleteExaminer: function (examinerId) {
            var deleteExaminer = $.ajax({
                type: 'DELETE',
                url: '/examiner/delete/' + examinerId
            });

            $.whenDone(deleteExaminer, function () {
                var deletedModel = collection.get(examinerId);
                collection.remove(deletedModel);
                layout.menu.show(new App.Views.MenuAdmin);
                layout.content.show(new App.Views.ExaminerList({collection: collection}));
            });
        },

        login: function (user) {
            var authentification = $.ajax({
                type: 'POST',
                url: '/login',
                data: user.toJSON()
            });

            $.when(authentification).done(function (logging) {
                if (logging.status == 'fail') {
                    $.notify(logging.message);
                }

                if (logging.status == 'ok') {
                    Teleegzam.Session = logging.session;
                    console.log(logging.session);
                    Teleegzam.Controllers.Exam.showAll();
                }
            });
        }
    }
});
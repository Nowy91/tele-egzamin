Teleegzam.module('ExaminerController', function(Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;

    Controller.showAll = function() {
        layout = new App.Layouts.Dashboard;
        var fetchingExaminers = $.ajax({
            type: 'GET',
            url: '/examiners',
            dataType: 'json'
        });
        $.when(fetchingExaminers).done(function (examiners) {
            for(var i=0;i<examiners.length;i++)
            {
                examiners[i].user.createdAt = getDate(examiners[i].user.createdAt);
                examiners[i].user.updatedAt = getDate(examiners[i].user.updatedAt);
            }
            collection = new App.Collections.Examiners(examiners);
            var examinersList = new App.Views.ExaminerList({collection: collection});
            layout.on("show", function () {
                layout.header.show(new App.Views.Header);
                layout.menu.show(new App.Views.MenuAdmin);
                layout.content.show(examinersList);
            });
            Teleegzam.mainRegion.show(layout);
        });
    }
    Controller.showExaminer = function(examinerId) {
        var getExaminer = $.ajax({
            type: 'GET',
            url: '/examiner/view/' + examinerId,
            dataType: 'json'
        });
        $.when(getExaminer).done(function (examiner) {
            examiner.user.createdAt = getDate(examiner.user.createdAt);
            examiner.user.updatedAt = getDate(examiner.user.updatedAt);
            var examinerModel = new App.Models.Examiner(examiner);
            layout.menu.show(new App.Views.ExaminerMenu);
            layout.content.show(new App.Views.ExaminerView({model: examinerModel}));
        });
    }
    Controller.addForm = function() {
        var addExaminerView = new App.Views.ExaminerAdd({collection: collection});
        layout.content.show(addExaminerView);
    }
    Controller.addExaminer = function(examiner) {
        var addExaminer = $.ajax({
            type: 'POST',
            url: '/examiner/add',
            data: examiner.toJSON(),
            dataType: 'json'
        });
        $.when(addExaminer).done(function(examiner) {
            examiner.user.createdAt = getDate(examiner.user.createdAt);
            examiner.user.updatedAt = getDate(examiner.user.updatedAt);
            collection.add(examiner);
            Teleegzam.ExaminerController.switchSelectedItem('examiners');
            var examinersList = new App.Views.ExaminerList({collection: collection});
            layout.menu.show(new App.Views.MenuAdmin);
            layout.content.show(examinersList);
        });
    }
    Controller.editForm = function(model){

        var editExaminerView = new App.Views.ExaminerEdit({model: model});
        layout.content.show(editExaminerView);
    }
    Controller.editExaminer = function(user, examinerId) {
        var that = this;

        var editExaminer = $.ajax({
            type: 'POST',
            url: '/examiner/edit/'+examinerId,
            data: user.toJSON(),
            dataType: 'json'
        });
        $.when(editExaminer).done(function(user) {
            user.createdAt = getDate(user.createdAt);
            user.updatedAt = getDate(user.updatedAt);

            var updatedModel = collection.get(examinerId);
            updatedModel.set("user", user);
            var examinersList = new App.Views.ExaminerList({collection: collection});
            layout.menu.show(new App.Views.MenuAdmin);
            layout.content.show(examinersList);
        });
    }
    Controller.deleteExaminer = function (examinerId) {
        var deleteExaminer = $.ajax({
            type: 'DELETE',
            url: '/examiner/delete/' + examinerId
        });

        $.when(deleteExaminer).done(function () {
            var deletedModel = collection.get(examinerId);
            collection.remove(deletedModel);
            var examinersList = new App.Views.ExaminerList({collection: collection});
            layout.menu.show(new App.Views.MenuAdmin);
            layout.content.show(examinersList);
        });
    }
    Controller.switchSelectedItem =  function(name) {
        $('a').parent().each(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        $('a.' + name).parent().addClass('active');
    }
});
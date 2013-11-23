Teleegzam.module('Controllers', function(Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;
    Controller.Examiner = {
        showAll : function() {
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
        },
        showExaminer : function(examinerId) {
            examinerModel = collection.get(examinerId);
            layout.menu.show(new App.Views.ExaminerMenu);
            layout.content.show(new App.Views.ExaminerView({model: examinerModel}));
        },
        addForm : function() {
            layout.content.show(new App.Views.ExaminerAdd);
        },
        editForm : function(examinerId){
            examinerModel = collection.get(examinerId);
            layout.content.show(new App.Views.ExaminerEdit({model: examinerModel}));
        },
        addExaminer : function(examiner) {
            var addExaminer = $.ajax({
                type: 'POST',
                url: '/examiner/add',
                data: examiner.toJSON(),
                dataType: 'json'
            });
            $.when(addExaminer)
                .done(function(examiner) {
                    examiner.user.createdAt = getDate(examiner.user.createdAt);
                    examiner.user.updatedAt = getDate(examiner.user.updatedAt);
                    collection.add(examiner);
                    Teleegzam.Controllers.Examiner.switchSelectedItem('examiners');
                    layout.menu.show(new App.Views.MenuAdmin);
                    layout.content.show(new App.Views.ExaminerList({collection: collection}));
                });
        },
        editExaminer : function(user, examinerId) {
            var editExaminer = $.ajax({
                type: 'POST',
                url: '/examiner/edit/'+examinerId,
                data: user.toJSON(),
                dataType: 'json'
            });
            $.when(editExaminer)
                .done(function(user) {
                    user.createdAt = getDate(user.createdAt);
                    user.updatedAt = getDate(user.updatedAt);

                    var updatedModel = collection.get(examinerId);
                    updatedModel.set("user", user);
                    layout.menu.show(new App.Views.MenuAdmin);
                    layout.content.show(new App.Views.ExaminerList({collection: collection}));
                });
        },
        deleteExaminer : function (examinerId) {
            var deleteExaminer = $.ajax({
                type: 'DELETE',
                url: '/examiner/delete/' + examinerId
            });

            $.when(deleteExaminer).done(function () {
                var deletedModel = collection.get(examinerId);
                collection.remove(deletedModel);
                layout.menu.show(new App.Views.MenuAdmin);
                layout.content.show(new App.Views.ExaminerList({collection: collection}));
            });
        },
        switchSelectedItem :  function(name) {
            $('a').parent().each(function() {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            });
            $('a.' + name).parent().addClass('active');
        }
    }
});
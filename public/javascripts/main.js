(function () {

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {},
        Templates: {
            names: [
                "dashboard",
                "exam_add",
                "exam_item",
                "exam_list",
                "examiner_item",
                "examinerList",
                "index",
                "menu",
                "menu_admin"
            ],
            templates: {},

            loadTemplates: function(callback) {

                var that = this;

                var loadTemplate = function(index) {
                    var name = that.names[index];

                    $.ajax({
                        url: '/javascripts/templates/' + name + '.html',
                        success: function(data) {
                            that.templates[name] = $(data).html();
                            index++;
                            if (index < that.names.length) {
                                loadTemplate(index);
                            } else {
                                callback();
                            }
                        }
                    });
                }

                loadTemplate(0);
            },

            get: function(name) {
                return this.templates[name];
            }
        },

        init: function() {
            App.Templates.loadTemplates(function() {
                App.Router = new Router;
                Backbone.history.start();
            });
        }
    }

})();

var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'exams': 'exams',
        'exam/add': 'addExam',
        'examiners': 'examiners'
    },

    index: function () {
        new App.Views.Index;
    },

    exams: function () {
        new App.Views.Dashboard;
    },

    examiners: function () {
        examinerView = new App.Views.ExaminerDashboard;
        examinerView.render();
    }

});

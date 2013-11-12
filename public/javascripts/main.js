(function () {

    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {},
        Templates: {
            items: {},

            get: function (name, callback) {
                var item = this.items[name];

                if (item) {
                    callback(item);
                }
                else {
                    var that = this;
                    $.get('/javascripts/templates/' + name + '.html', function (data) {
                        var $template = $(data).html();
                        that.items[name] = $template;
                        callback($template);
                    });
                }
            }
        }
    };
})();

var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'exams': 'exams',
        'exam/add': 'addExam',
        'examiners':'examiners'
    },

    index: function () {
        homeView = new App.Views.Index;
    },

    exams: function () {
        dashboardView = new App.Views.Dashboard;

        dashboardView.menu = new App.Views.Menu;
        dashboardView.menu.selected = 'exams';
        dashboardView.body = new App.Views.ExamList;

        dashboardView.render();
    },

    addExam: function() {
        dashboardView = new App.Views.Dashboard;

        dashboardView.menu = new App.Views.Menu;
        dashboardView.menu.selected = 'add_exam';
        dashboardView.body = new App.Views.ExamAdd;

        dashboardView.render();
    },
    examiners: function () {
        examinerView = new App.Views.ExaminerDashboard;
        examinerView.render();
    },
});

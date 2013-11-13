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

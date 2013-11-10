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

App.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'exams': 'exams'
    },

    index: function () {
        homeView = new App.Views.Index({el: $("#content")});
    },

    exams: function () {
        dashboardView = new App.Views.Dashboard;
        dashboardView.render();
    }
});

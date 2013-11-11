App.Views.Dashboard = Backbone.View.extend({

    el: $('#content'),
    templateName: 'dashboard',

    initialize: function () {
        this.render();
    },

    render: function () {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template, {menuId: '#aktualne'}));

            var menuView = new App.Views.Menu;
            $('.menu_hook').append(menuView.el);

            var examListView = new App.Views.ExamList;
            $('.body_hook').append(examListView.el);
        });
    }

});
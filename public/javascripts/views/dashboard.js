App.Views.Dashboard = Backbone.View.extend({

    el: $('#content'),
    templateName: 'dashboard',

    initialize: function () {
        this.menuView = new App.Views.Menu;
        this.examListView = new App.Views.ExamList;
    },

    renderNested: function (view, selector) {
        var $element = ( selector instanceof $ ) ? selector : this.$(selector);
        view.setElement($element).render();
    },

    render: function () {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template, {menuId: '#aktualne'}));

            that.renderNested(that.menuView, $('.menu_hook'));
            that.renderNested(that.examListView, $('.table_hook'));
        });
    }

});
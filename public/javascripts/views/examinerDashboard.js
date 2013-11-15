App.Views.ExaminerDashboard = Backbone.View.extend({

    el: $('#content'),
    templateName: 'dashboard',

    initialize: function () {
        this.menuView = new App.Views.MenuAdmin;
        this.examinerListView = new App.Views.ExaminerList;

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
            that.renderNested(that.examinerListView, $('.body_hook'));
        });
    }

});
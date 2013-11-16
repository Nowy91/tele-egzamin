App.Views.ExaminerDashboard = Backbone.View.extend({

    el: $('#content'),

    initialize: function () {
        this.template = App.Templates.get('dashboard');
        this.menuView = new App.Views.MenuAdmin;
        this.examinerListView = new App.Views.ExaminerList;
    },

    renderNested: function (view, selector) {
        var $element = ( selector instanceof $ ) ? selector : this.$(selector);
        view.setElement($element).render();
    },

    render: function () {
        this.$el.html(_.template(this.template, {menuId: '#aktualne'}));

        this.renderNested(this.menuView, $('.menu_hook'));
        this.renderNested(this.examinerListView, $('.body_hook'));
        return this;
    }

});
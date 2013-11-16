App.Views.Menu = Backbone.View.extend({

    events: {
        'click a.exams': 'exams',
        'click a.add_exam': 'addExam'
    },

    initialize: function () {
        this.template = App.Templates.get('menu');
    },

    render: function () {
        this.$el.html(_.template(this.template, {menuId: this.selected}));
        return this;
    },

    exams: function() {
        Backbone.trigger('click-exams-list');
    },

    addExam: function() {
        Backbone.trigger('click-add-exam');
    }

});

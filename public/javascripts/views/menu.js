App.Views.Menu = Backbone.View.extend({

    templateName: 'menu',

    initialize: function () {
    },

    events: {
        'click a.exams': 'exams',
        'click a.add_exam': 'addExam'
    },

    render: function () {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template, {menuId: that.selected}));
        });
        return this;
    },

    exams: function() {
        Backbone.trigger('click-exams-list');
    },

    addExam: function() {
        Backbone.trigger('click-add-exam');
    }

});

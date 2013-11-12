App.Views.ExamAdd = Backbone.View.extend({

    templateName: 'exam_add',

    initialize: function() {
        this.render();
    },

    render: function() {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template));
        });
        return this;
    }

});
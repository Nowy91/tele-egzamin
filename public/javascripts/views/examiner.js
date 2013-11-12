App.Views.ExaminerItem = Backbone.View.extend({

    tagName: 'tr',
    templateName: 'examiner_item',

    initialize: function() {
        this.render();
    },

    render: function() {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template, that.model));
        });
    }

});
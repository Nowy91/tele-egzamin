App.Views.ExamList = Backbone.View.extend({

    templateName: 'examList',

    initialize: function () {
        this.render();
    },

    render: function () {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template));
            return that;
        });
    }
});

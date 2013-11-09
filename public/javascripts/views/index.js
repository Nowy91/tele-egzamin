App.Views.Index = Backbone.View.extend({

    templateName: 'index',

    initialize: function () {
        this.render();
    },

    render: function () {
        var that = this;
        App.Templates.get(this.templateName, function (template) {
            that.$el.html(_.template(template));
        });
        return this;
    }

});